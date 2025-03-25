import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsContextType = {
  speed: number;
  setSpeed: (speed: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  autoPlay: boolean;
  setAutoPlay: (autoPlay: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [autoPlay, setAutoPlay] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [theme, setTheme] = useState('light');

  // Load saved settings when the app starts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedAutoPlay = await AsyncStorage.getItem('settings_autoPlay');
        const savedSpeed = await AsyncStorage.getItem('settings_speed');
        const savedVolume = await AsyncStorage.getItem('settings_volume');
        const savedTheme = await AsyncStorage.getItem('settings_theme');

        if (savedAutoPlay) setAutoPlay(JSON.parse(savedAutoPlay));
        if (savedSpeed) setSpeed(JSON.parse(savedSpeed));
        if (savedVolume) setVolume(JSON.parse(savedVolume));
        if (savedTheme) setTheme(savedTheme);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        speed,
        setSpeed,
        volume,
        setVolume,
        theme,
        setTheme,
        autoPlay,
        setAutoPlay,
      }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 