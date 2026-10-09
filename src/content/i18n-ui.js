/**
 * Minimal system UI translation dictionary
 * Used only for internal interface labels and accessibility texts. Content is primarily Markdown-driven.
 */
export const uiTranslations = {
  'zh-CN': {
    skipLink: '跳到主要内容',
    emptyStateTitle: '暂时没有内容',
    emptyStateDescription: '在对应的 Markdown 文件里添加 items 后，这里会自动显示。',
    mainNavigation: '主要导航',
    openNavigation: '打开导航',
    scrollTo: '滚动到',
    nextSection: '下一部分',
    language: '语言',
  },
  'en': {
    skipLink: 'Skip to main content',
    emptyStateTitle: 'No content yet',
    emptyStateDescription: 'Items will automatically appear here once added to the corresponding Markdown file.',
    mainNavigation: 'Main navigation',
    openNavigation: 'Open navigation',
    scrollTo: 'Scroll to ',
    nextSection: 'Next section',
    language: 'Language',
  },
};

export const getUiMessage = (key, locale = 'en') => {
  const messages = uiTranslations[locale] || uiTranslations.en || {};
  return messages[key] || (uiTranslations.en && uiTranslations.en[key]) || key;
};
