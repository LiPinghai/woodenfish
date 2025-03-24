import React, { createContext, useState, useContext } from 'react';

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

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [autoPlay, setAutoPlay] = useState(false);

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
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 