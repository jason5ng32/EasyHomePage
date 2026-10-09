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
    // 1. User choice stored in localStorage
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && availableLocales.some((l) => l.code === stored)) {
            return stored;
        }
    } catch {
        // localStorage not available or blocked
    }

    // 2. URL search parameter ?lang=xx
    if (typeof window !== 'undefined' && window.location?.search) {
        const params = new URLSearchParams(window.location.search);
        const queryLang = params.get('lang');
        if (queryLang && availableLocales.some((l) => l.code === queryLang)) {
            return queryLang;
        }
    }

    // 3. Browser language matching (generic matching for any language)
    if (typeof navigator !== 'undefined') {
        const browserLanguages = navigator.languages || [navigator.language || ''];
        for (const bLang of browserLanguages) {
            if (!bLang) continue;
            const normalized = bLang.toLowerCase();

            // Exact match (e.g. ja matches ja, zh-CN matches zh-CN)
            const exactMatch = availableLocales.find((l) => l.code.toLowerCase() === normalized);
            if (exactMatch) {
                return exactMatch.code;
            }

            // Prefix fuzzy match (e.g. ja-JP matches ja, es-ES matches es)
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

    // 4. Default fallback locale configured in the site
    return fallbackLocale;
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