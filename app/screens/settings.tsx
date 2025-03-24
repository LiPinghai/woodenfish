import React from 'react';
import { View, Text, Switch, StyleSheet, Pressable } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import Slider from '@react-native-community/slider';

export default function SettingScreen() {
  const { autoPlay, setAutoPlay, speed, setSpeed, volume, setVolume, theme, setTheme } = useSettings();

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, theme === 'dark' ? styles.darkText : styles.lightText]}>
        Settings
      </Text>
      
      <View style={[styles.settingItem, theme === 'dark' ? styles.darkBorder : styles.lightBorder]}>
        <Text style={[styles.settingLabel, theme === 'dark' ? styles.darkText : styles.lightText]}>
          Auto Play Sound
        </Text>
        <Switch value={autoPlay} onValueChange={setAutoPlay} />
      </View>

      <View style={[styles.settingItem, theme === 'dark' ? styles.darkBorder : styles.lightBorder]}>
        <Text style={[styles.settingLabel, theme === 'dark' ? styles.darkText : styles.lightText]}>
          Interval: {speed.toFixed(1)}s
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0.2}
          maximumValue={2.0}
          step={0.1}
          value={speed}
          onValueChange={setSpeed}
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
          step={0.1}
          value={volume}
          onValueChange={setVolume}
          minimumTrackTintColor={theme === 'dark' ? '#FFFFFF' : '#000000'}
          maximumTrackTintColor={theme === 'dark' ? '#666666' : '#CCCCCC'}
          thumbTintColor={theme === 'dark' ? '#FFFFFF' : '#000000'}
        />
      </View>

      <View style={[styles.settingItem, theme === 'dark' ? styles.darkBorder : styles.lightBorder]}>
        <Text style={[styles.settingLabel, theme === 'dark' ? styles.darkText : styles.lightText]}>
          Theme
        </Text>
        <Pressable
          style={[styles.themeButton, theme === 'dark' ? styles.darkButton : styles.lightButton]}
          onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          <Text style={styles.themeButtonText}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </Pressable>
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
  themeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  darkButton: {
    backgroundColor: '#FFFFFF',
  },
  lightButton: {
    backgroundColor: '#000000',
  },
  themeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
