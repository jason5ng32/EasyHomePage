import { describe, it, expect } from 'vitest';
import { getUiMessage } from '@/content/i18n-ui';

describe('i18n core logic and resolution', () => {
  describe('UI Message resolution', () => {
    it('should return correct message for zh-CN', () => {
      expect(getUiMessage('skipLink', 'zh-CN')).toBe('跳到主要内容');
      expect(getUiMessage('emptyStateTitle', 'zh-CN')).toBe('暂时没有内容');
    });

    it('should return correct message for en', () => {
      expect(getUiMessage('skipLink', 'en')).toBe('Skip to main content');
      expect(getUiMessage('emptyStateTitle', 'en')).toBe('No content yet');
    });

    it('should fallback to en for unknown locale', () => {
      expect(getUiMessage('skipLink', 'fr')).toBe('Skip to main content');
      expect(getUiMessage('emptyStateTitle', 'de')).toBe('No content yet');
    });

    it('should return key itself if not translated anywhere', () => {
      expect(getUiMessage('nonExistentKey', 'en')).toBe('nonExistentKey');
    });
  });

  describe('Generic Language resolution logic', () => {
    const mockAvailableLocales = [
      { code: 'en', name: 'English', short: 'EN' },
      { code: 'zh-CN', name: '简体中文', short: '中' },
    ];

    const matchLanguage = (browserLangs, available, fallback = 'en') => {
      for (const bLang of browserLangs) {
        if (!bLang) continue;
        const normalized = bLang.toLowerCase();

        // Exact match
        const exactMatch = available.find((l) => l.code.toLowerCase() === normalized);
        if (exactMatch) {
          return exactMatch.code;
        }

        // Prefix match
        const prefix = normalized.split('-')[0];
        const prefixMatch = available.find((l) => {
          const targetCode = l.code.toLowerCase();
          return targetCode.startsWith(prefix) || prefix === targetCode.split('-')[0];
        });
        if (prefixMatch) {
          return prefixMatch.code;
        }
      }
      return fallback;
    };

    it('should match exact locale codes', () => {
      expect(matchLanguage(['zh-CN'], mockAvailableLocales)).toBe('zh-CN');
      expect(matchLanguage(['en'], mockAvailableLocales)).toBe('en');
    });

    it('should match locale prefixes generically', () => {
      expect(matchLanguage(['zh-TW'], mockAvailableLocales)).toBe('zh-CN');
      expect(matchLanguage(['zh-HK'], mockAvailableLocales)).toBe('zh-CN');
      expect(matchLanguage(['en-US'], mockAvailableLocales)).toBe('en');
      expect(matchLanguage(['en-GB'], mockAvailableLocales)).toBe('en');
    });

    it('should match non-standard languages like ja or es generically', () => {
      const customLocales = [
        { code: 'ja', name: '日本語', short: '日' },
        { code: 'es', name: 'Español', short: 'ES' },
      ];
      expect(matchLanguage(['ja-JP'], customLocales, 'ja')).toBe('ja');
      expect(matchLanguage(['es-MX'], customLocales, 'ja')).toBe('es');
      expect(matchLanguage(['fr-FR'], customLocales, 'ja')).toBe('ja');
    });

    it('should fallback when no language matches', () => {
      expect(matchLanguage(['fr', 'de'], mockAvailableLocales, 'en')).toBe('en');
    });
  });
});
