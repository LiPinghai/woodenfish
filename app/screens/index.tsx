import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function MainScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { speed, volume, theme, autoPlay } = useSettings();

  // Add preload effect
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/woodenfish1.mp3'),
        { volume: volume }
      );
      setSound(sound);
    };
    loadSound();

    // Cleanup when component unmounts
    return () => {
      sound?.unloadAsync();
    };
  }, []); // Empty dependency array means this runs once on mount

  const stopAutoplay = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsAutoplaying(false);
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  const playSingleSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  const startAutoplay = async () => {
    if (isAutoplaying) {
      await stopAutoplay();
      return;
    }

    setIsAutoplaying(true);
    await sound?.replayAsync();
    
    // Set up the interval for the next sound
    const interval = speed * 1000;
    const timeout = setTimeout(() => {
      startAutoplay();
    }, interval);
    setTimeoutId(timeout);
  };

  const handlePress = async () => {
    if (autoPlay) {
      await startAutoplay();
    } else {
      await playSingleSound();
    }
  };

  // Update sound volume when volume setting changes
  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(volume);
    }
  }, [volume]);

  // Stop autoplay when autoplay setting is turned off
  useEffect(() => {
    if (!autoPlay && isAutoplaying) {
      stopAutoplay();
    }
  }, [autoPlay]);

  // Cleanup timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <TouchableOpacity onPress={handlePress}>
        <Image 
          source={theme === 'dark' 
            ? require('../../assets/images/woodenfish-dark.png')
            : require('../../assets/images/woodenfish-light.png')
          } 
          style={styles.image} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  lightContainer: {
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#000000',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
