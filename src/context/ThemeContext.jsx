import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    id: 'dark',
    name: 'Stealth Dark',
    preview: '#0a0f1e',
    colors: {
      '--bg-primary': '#0a0f1e',
      '--bg-secondary': '#0d1b2a',
      '--bg-surface': 'rgba(255,255,255,0.02)',
      '--bg-surface-hover': 'rgba(255,255,255,0.04)',
      '--bg-card': 'rgba(255,255,255,0.05)',
      '--bg-footer': '#060a15',
      '--bg-gradient-start': '#0d1b2a',
      '--bg-gradient-end': '#0a0f1e',
      '--text-primary': '#ffffff',
      '--text-secondary': '#e2e8f0',
      '--text-muted': '#94a3b8',
      '--text-dim': '#64748b',
      '--text-dimmer': '#475569',
      '--border-color': 'rgba(255,255,255,0.06)',
      '--border-light': 'rgba(255,255,255,0.1)',
      '--border-hover': 'rgba(255,255,255,0.15)',
      '--accent': '#00d4ff',
      '--accent-rgb': '0, 212, 255',
      '--accent-glow': 'rgba(0, 212, 255, 0.4)',
      '--accent-subtle': 'rgba(0, 212, 255, 0.1)',
      '--accent-border': 'rgba(0, 212, 255, 0.3)',
      '--glass-bg': 'rgba(255,255,255,0.05)',
      '--glass-border': 'rgba(255,255,255,0.1)',
      '--input-bg': 'rgba(255,255,255,0.04)',
      '--input-border': 'rgba(255,255,255,0.08)',
      '--input-text': '#e2e8f0',
      '--input-placeholder': '#475569',
      '--scrollbar-track': '#0a0f1e',
      '--scrollbar-thumb': '#1e293b',
      '--dot-pattern': 'rgba(255,255,255,0.03)',
      '--particle-color': '0, 212, 255',
      '--shadow-color': 'rgba(0,0,0,0.2)',
      '--nav-scrolled': 'rgba(10,15,30,0.9)',
      '--color-scheme': 'dark',
    },
  },
  white: {
    id: 'white',
    name: 'Arctic White',
    preview: '#f8fafc',
    colors: {
      '--bg-primary': '#f8fafc',
      '--bg-secondary': '#f1f5f9',
      '--bg-surface': 'rgba(0,0,0,0.02)',
      '--bg-surface-hover': 'rgba(0,0,0,0.04)',
      '--bg-card': 'rgba(0,0,0,0.03)',
      '--bg-footer': '#e2e8f0',
      '--bg-gradient-start': '#f1f5f9',
      '--bg-gradient-end': '#f8fafc',
      '--text-primary': '#0f172a',
      '--text-secondary': '#1e293b',
      '--text-muted': '#475569',
      '--text-dim': '#64748b',
      '--text-dimmer': '#94a3b8',
      '--border-color': 'rgba(0,0,0,0.08)',
      '--border-light': 'rgba(0,0,0,0.12)',
      '--border-hover': 'rgba(0,0,0,0.18)',
      '--accent': '#0ea5e9',
      '--accent-rgb': '14, 165, 233',
      '--accent-glow': 'rgba(14, 165, 233, 0.35)',
      '--accent-subtle': 'rgba(14, 165, 233, 0.08)',
      '--accent-border': 'rgba(14, 165, 233, 0.3)',
      '--glass-bg': 'rgba(255,255,255,0.7)',
      '--glass-border': 'rgba(0,0,0,0.08)',
      '--input-bg': 'rgba(0,0,0,0.03)',
      '--input-border': 'rgba(0,0,0,0.1)',
      '--input-text': '#1e293b',
      '--input-placeholder': '#94a3b8',
      '--scrollbar-track': '#f1f5f9',
      '--scrollbar-thumb': '#cbd5e1',
      '--dot-pattern': 'rgba(0,0,0,0.03)',
      '--particle-color': '14, 165, 233',
      '--shadow-color': 'rgba(0,0,0,0.08)',
      '--nav-scrolled': 'rgba(248,250,252,0.92)',
      '--color-scheme': 'light',
    },
  },
  royal: {
    id: 'royal',
    name: 'Royal Blue',
    preview: '#1e3a8a',
    colors: {
      '--bg-primary': '#0c1a3d',
      '--bg-secondary': '#152457',
      '--bg-surface': 'rgba(255,255,255,0.04)',
      '--bg-surface-hover': 'rgba(255,255,255,0.07)',
      '--bg-card': 'rgba(255,255,255,0.06)',
      '--bg-footer': '#081230',
      '--bg-gradient-start': '#152457',
      '--bg-gradient-end': '#0c1a3d',
      '--text-primary': '#ffffff',
      '--text-secondary': '#dbeafe',
      '--text-muted': '#93c5fd',
      '--text-dim': '#60a5fa',
      '--text-dimmer': '#3b82f6',
      '--border-color': 'rgba(147,197,253,0.1)',
      '--border-light': 'rgba(147,197,253,0.15)',
      '--border-hover': 'rgba(147,197,253,0.25)',
      '--accent': '#60a5fa',
      '--accent-rgb': '96, 165, 250',
      '--accent-glow': 'rgba(96, 165, 250, 0.4)',
      '--accent-subtle': 'rgba(96, 165, 250, 0.12)',
      '--accent-border': 'rgba(96, 165, 250, 0.35)',
      '--glass-bg': 'rgba(255,255,255,0.06)',
      '--glass-border': 'rgba(147,197,253,0.12)',
      '--input-bg': 'rgba(255,255,255,0.05)',
      '--input-border': 'rgba(147,197,253,0.12)',
      '--input-text': '#dbeafe',
      '--input-placeholder': '#3b82f6',
      '--scrollbar-track': '#0c1a3d',
      '--scrollbar-thumb': '#1e3a8a',
      '--dot-pattern': 'rgba(147,197,253,0.04)',
      '--particle-color': '96, 165, 250',
      '--shadow-color': 'rgba(0,0,0,0.3)',
      '--nav-scrolled': 'rgba(12,26,61,0.92)',
      '--color-scheme': 'dark',
    },
  },
};

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    try {
      return localStorage.getItem('sniperaero-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const theme = themes[themeId] || themes.dark;

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });
    root.setAttribute('data-theme', themeId);
    try {
      localStorage.setItem('sniperaero-theme', themeId);
    } catch {}
  }, [themeId, theme]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, theme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
