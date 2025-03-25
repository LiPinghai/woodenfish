import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function TabOneScreen() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { speed, volume, theme, autoPlay } = useSettings();

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
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/woodenfish1.mp3'),
        {
          volume: volume,
        }
      );
      setSound(sound);
    }
    await sound?.playAsync();
  };

  const startAutoplay = async () => {
    if (isAutoplaying) {
      await stopAutoplay();
      return;
    }

    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/woodenfish1.mp3'),
        {
          volume: volume,
        }
      );
      setSound(sound);
    }
    setIsAutoplaying(true);
    await sound?.playAsync();
    
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
