import { siteConfig, themePresets } from '@/content/site';

const THEMES = new Set(themePresets);
const CUSTOM_COLOR_TOKENS = new Set([
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
  'hero',
  'panel',
  'panel-foreground',
  'stripe',
]);

const normalizeTokenName = (name = '') => {
  return name
    .replace(/^--/, '')
    .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

const getTheme = () => {
  if (THEMES.has(siteConfig.theme.preset)) {
    return siteConfig.theme.preset;
  }

  return 'graphite';
};

const applyCustomTokens = (tokens = {}) => {
  Object.entries(tokens || {}).forEach(([name, value]) => {
    const tokenName = normalizeTokenName(name);

    if (!CUSTOM_COLOR_TOKENS.has(tokenName) || !value) {
      return;
    }

    document.documentElement.style.setProperty(`--${tokenName}`, value);
  });
};

const applySystemMode = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', prefersDark);
  applyCustomTokens(siteConfig.theme.customTokens);
  applyCustomTokens(prefersDark ? siteConfig.theme.customDarkTokens : {});
};

export const applyThemePreferences = () => {
  document.documentElement.dataset.theme = getTheme();
  applySystemMode();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemMode);
};
