// store.js
import { defineStore } from 'pinia';
import {
    availableLocales,
    fallbackLocale,
    getNavigationItems,
    getSiteConfig,
    applySiteMetadata,
    isMultiLocale,
} from '@/content/site';
import { getSections } from '@/content/sections';
import { getUiMessage } from '@/content/i18n-ui';

const STORAGE_KEY = 'easy-homepage-lang';

const resolveInitialLocale = () => {
    // 1. 本地缓存用户选择
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && availableLocales.some((l) => l.code === stored)) {
            return stored;
        }
    } catch {
        // localStorage not available or blocked
    }

    // 2. URL 参数 ?lang=xx
    if (typeof window !== 'undefined' && window.location?.search) {
        const params = new URLSearchParams(window.location.search);
        const queryLang = params.get('lang');
        if (queryLang && availableLocales.some((l) => l.code === queryLang)) {
            return queryLang;
        }
    }

    // 3. 浏览器语言智能匹配
    if (typeof navigator !== 'undefined') {
        const browserLanguages = navigator.languages || [navigator.language || ''];
        for (const bLang of browserLanguages) {
            if (!bLang) continue;
            const normalized = bLang.toLowerCase();

            // 精确匹配 (如 zh-CN 匹配 zh-CN, en 匹配 en)
            const exactMatch = availableLocales.find((l) => l.code.toLowerCase() === normalized);
            if (exactMatch) {
                return exactMatch.code;
            }

            // 前缀模糊匹配 (如 zh-HK / zh-TW 匹配 zh-CN，en-US 匹配 en)
            const prefix = normalized.split('-')[0];
            const prefixMatch = availableLocales.find((l) => {
                const targetCode = l.code.toLowerCase();
                return targetCode.startsWith(prefix) || prefix === targetCode.split('-')[0];
            });
            if (prefixMatch) {
                return prefixMatch.code;
            }
        }
    }

    // 4. 默认 fallback 语言：英文 'en'（若配置了），否则为系统检测的 fallbackLocale
    const hasEn = availableLocales.some((l) => l.code === 'en');
    return hasEn ? 'en' : fallbackLocale;
};

export const useMainStore = defineStore('main', {
    state: () => ({
        isMobile: false,
        currentLocale: resolveInitialLocale(),
    }),

    getters: {
        availableLocales: () => availableLocales,
        isMultiLocale: () => isMultiLocale && availableLocales.length > 1,
        siteConfig: (state) => getSiteConfig(state.currentLocale),
        navigationItems: (state) => getNavigationItems(state.currentLocale),
        sections: (state) => getSections(state.currentLocale),
        t: (state) => (key) => getUiMessage(key, state.currentLocale),
    },

    actions: {
        setIsMobile(value) {
            this.isMobile = value;
        },
        setLocale(locale) {
            if (!availableLocales.some((l) => l.code === locale)) {
                return;
            }
            this.currentLocale = locale;
            try {
                localStorage.setItem(STORAGE_KEY, locale);
            } catch {
                // ignore
            }
            applySiteMetadata(locale);
        },
    },
});