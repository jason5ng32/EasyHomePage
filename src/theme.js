const THEMES = new Set(['graphite', 'violet', 'ocean', 'forest', 'rose']);

const getTheme = () => {
  const params = new URLSearchParams(window.location.search);
  const queryValue = params.get('theme');

  if (queryValue && THEMES.has(queryValue)) {
    return queryValue;
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
