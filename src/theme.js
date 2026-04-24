import { siteConfig, themePresets } from '@/content/site';

const THEMES = new Set(themePresets);

const getTheme = () => {
  if (THEMES.has(siteConfig.theme.preset)) {
    return siteConfig.theme.preset;
  }

  return 'graphite';
};

const applySystemMode = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', prefersDark);
};

export const applyThemePreferences = () => {
  document.documentElement.dataset.theme = getTheme();
  applySystemMode();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemMode);
};
