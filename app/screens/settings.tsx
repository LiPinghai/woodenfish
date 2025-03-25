import React from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingScreen() {
  const { autoPlay, setAutoPlay, speed, setSpeed, volume, setVolume, theme, setTheme } = useSettings();

  // Add handlers to save settings when they change
  const handleAutoPlayChange = async (value: boolean) => {
    setAutoPlay(value);
    await AsyncStorage.setItem('settings_autoPlay', JSON.stringify(value));
  };

  const handleSpeedChange = async (value: number) => {
    setSpeed(value);
    await AsyncStorage.setItem('settings_speed', JSON.stringify(value));
  };

  const handleVolumeChange = async (value: number) => {
    setVolume(value);
    await AsyncStorage.setItem('settings_volume', JSON.stringify(value));
  };

  const handleThemeChange = async (value: boolean) => {
    const newTheme = value ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('settings_theme', newTheme);
  };

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, theme === 'dark' ? styles.darkText : styles.lightText]}>
        Settings
      </Text>
      
      <View style={[styles.settingItem, theme === 'dark' ? styles.darkBorder : styles.lightBorder]}>
        <Text style={[styles.settingLabel, theme === 'dark' ? styles.darkText : styles.lightText]}>
          Auto Play Sound
        </Text>
        <Switch value={autoPlay} onValueChange={handleAutoPlayChange} />
      </View>

      <View style={[styles.settingItem, theme === 'dark' ? styles.darkBorder : styles.lightBorder]}>
        <Text style={[styles.settingLabel, theme === 'dark' ? styles.darkText : styles.lightText]}>
          Interval: {speed.toFixed(1)}s
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={3.0}
          step={0.1}
          value={speed}
          onValueChange={handleSpeedChange}
          minimumTrackTintColor={theme === 'dark' ? '#FFFFFF' : '#000000'}
          maximumTrackTintColor={theme === 'dark' ? '#666666' : '#CCCCCC'}
          thumbTintColor={theme === 'dark' ? '#FFFFFF' : '#000000'}
        />
      </View>

      <View style={[styles.settingItem, theme === 'dark' ? styles.darkBorder : styles.lightBorder]}>
        <Text style={[styles.settingLabel, theme === 'dark' ? styles.darkText : styles.lightText]}>
          Volume: {Math.round(volume * 100)}%
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor={theme === 'dark' ? '#FFFFFF' : '#000000'}
          maximumTrackTintColor={theme === 'dark' ? '#666666' : '#CCCCCC'}
          thumbTintColor={theme === 'dark' ? '#FFFFFF' : '#000000'}
        />
      </View>

      <View style={[styles.settingItem, theme === 'dark' ? styles.darkBorder : styles.lightBorder]}>
        <Text style={[styles.settingLabel, theme === 'dark' ? styles.darkText : styles.lightText]}>
          Dark Mode
        </Text>
        <Switch 
          value={theme === 'dark'} 
          onValueChange={handleThemeChange} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  darkBorder: {
    borderBottomColor: '#333333',
  },
  lightBorder: {
    borderBottomColor: '#CCCCCC',
  },
  settingLabel: {
    fontSize: 16,
    flex: 1,
  },
  slider: {
    flex: 2,
    marginLeft: 10,
  },
});
