import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ConstantColors } from '../utils/Colors';

type Theme = {
  isDark: boolean;
  backgroundColor: string;
  textColor: string;
  statusBarStyle: 'light-content' | 'dark-content';
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme = useMemo<Theme>(() => ({
    isDark,
    backgroundColor: isDark ? Colors.darker : Colors.lighter,
    textColor: isDark ? ConstantColors.white : ConstantColors.balck,
    statusBarStyle: isDark ? 'light-content' : 'dark-content',
  }), [isDark]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};