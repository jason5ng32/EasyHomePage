import { asArray, warnContentIssue } from '@/content/guards';

const siteAssets = import.meta.glob('/site/assets/**/*.{png,jpg,jpeg,webp,svg,ico}', {
    eager: true,
    import: 'default',
    query: '?url',
});

const defaultThemePresets = ['graphite', 'violet', 'ocean', 'forest', 'rose'];
const knownSectionIds = ['Introduce', 'Stories', 'Skills', 'Jobs', 'Products', 'Works', 'Services', 'Footer'];

const defaultLocaleMetadata = {
    'en': { name: 'English', short: 'EN' },
    'zh-CN': { name: '简体中文', short: '中' },
    'zh': { name: '中文', short: '中' },
    'zh-TW': { name: '繁體中文', short: '繁' },
    'ja': { name: '日本語', short: '日' },
    'es': { name: 'Español', short: 'ES' },
    'fr': { name: 'Français', short: 'FR' },
    'de': { name: 'Deutsch', short: 'DE' },
    'ko': { name: '한국어', short: '한' },
    'ru': { name: 'Русский', short: 'RU' },
    'pt': { name: 'Português', short: 'PT' },
    'it': { name: 'Italiano', short: 'IT' },
};

const normalizeContentPath = (path = '') => {
    return path.replace(/^\/+/, '').replace(/^site\//, '');
};

export const resolveContentAsset = (path = '') => {
    if (!path) {
        return '';
    }

    if (/^(https?:|mailto:|tel:|\/)/.test(path)) {
        return path;
    }

    return siteAssets[`/site/${normalizeContentPath(path)}`] || path;
};

// 1. Read global cross-language configuration
const globalConfigModules = import.meta.glob('/site/config.md', { eager: true });
const globalAttributes = globalConfigModules['/site/config.md']?.attributes || {};

// 2. Read language-specific modules (prioritize site/*/locale.md, backward-compatible with site/*/config.md)
const localeModules = import.meta.glob(['/site/*/locale.md', '/site/*/config.md'], { eager: true });

const rawConfigsByLocale = {};
const detectedLocalesSet = new Set();

// Extract available locale keys from file paths
for (const [pathKey, module] of Object.entries(localeModules)) {
    const match = pathKey.match(/^\/site\/([^/]+)\/(?:locale|config)\.md$/);
    if (match) {
        const localeCode = match[1];
        if (!rawConfigsByLocale[localeCode] || pathKey.endsWith('locale.md')) {
            rawConfigsByLocale[localeCode] = module.attributes || {};
        }
        detectedLocalesSet.add(localeCode);
    }
}

// 3. Resolve supported languages: up to 2 languages
const configuredLanguages = asArray(globalAttributes.languages, 'languages').slice(0, 2);
let detectedLocales = [];

if (configuredLanguages.length > 0) {
    // Collect configured languages (max 2)
    detectedLocales = configuredLanguages
        .map((lang) => (typeof lang === 'string' ? lang : lang?.code))
        .filter(Boolean)
        .slice(0, 2);
} else {
    // If not declared explicitly in config.md, infer from discovered directories (max 2)
    detectedLocales = Array.from(detectedLocalesSet).slice(0, 2);
}

// If no subdirectories found, fallback to default English
if (detectedLocales.length === 0) {
    detectedLocales = ['en'];
    rawConfigsByLocale['en'] = globalAttributes;
}

// Determine if the site is in multi-locale mode (strictly > 1 language)
export const isMultiLocale = detectedLocales.length > 1;

// Determine fallback locale: check configured default: true, then 'en', then first detected
const explicitDefault = configuredLanguages.find((l) => typeof l === 'object' && l.default)?.code;
export const fallbackLocale = explicitDefault && detectedLocales.includes(explicitDefault)
    ? explicitDefault
    : detectedLocales.includes('en')
        ? 'en'
        : (detectedLocales[0] || 'en');

// Format available locales for UI switchers
export const availableLocales = detectedLocales.map((locale) => {
    const raw = rawConfigsByLocale[locale] || {};
    const configuredFromGlobal = configuredLanguages.find(
        (l) => typeof l === 'object' && l.code === locale
    );
    const configuredName = configuredFromGlobal?.name || raw.site?.languageName;
    const configuredShort = configuredFromGlobal?.short || raw.site?.languageShort;
    const fallbackMeta = defaultLocaleMetadata[locale] || {
        name: locale,
        short: locale.slice(0, 2).toUpperCase(),
    };

    return {
        code: locale,
        name: configuredName || fallbackMeta.name,
        short: configuredShort || fallbackMeta.short,
    };
});

const buildSiteConfig = (attributes = {}, fallbackAttributes = {}) => {
    const site = {
        title: 'EasyHomePage',
        description: '',
        language: fallbackLocale,
        loadingTitle: 'Loading',
        loadingDescription: '',
        emptyStateTitle: 'No content yet',
        emptyStateDescription: 'Items will automatically appear here once added to the corresponding Markdown file.',
        ...(globalAttributes.site || {}),
        ...(fallbackAttributes.site || {}),
        ...(attributes.site || {}),
    };

    const brand = {
        name: 'JN',
        logo: 'assets/logo.png',
        avatar: 'assets/memoji.png',
        favicon: 'favicon.ico',
        ...(globalAttributes.brand || {}),
        ...(fallbackAttributes.brand || {}),
        ...(attributes.brand || {}),
    };

    const profile = {
        birthDate: '',
        ...(globalAttributes.profile || {}),
        ...(fallbackAttributes.profile || {}),
        ...(attributes.profile || {}),
        version: {
            enabled: false,
            title: '',
            prefix: '',
            ...((globalAttributes.profile || {}).version || {}),
            ...((fallbackAttributes.profile || {}).version || {}),
            ...((attributes.profile || {}).version || {}),
        },
    };

    const theme = {
        preset: 'graphite',
        availablePresets: defaultThemePresets,
        customTokens: {},
        customDarkTokens: {},
        ...(globalAttributes.theme || {}),
        ...(fallbackAttributes.theme || {}),
        ...(attributes.theme || {}),
    };

    const navigation = {
        items: [],
        ...(globalAttributes.navigation || {}),
        ...(fallbackAttributes.navigation || {}),
        ...(attributes.navigation || {}),
    };

    const analytics = {
        enabled: false,
        provider: '',
        app: 'EasyHomePage',
        measurementIds: [],
        ...(globalAttributes.analytics || {}),
        ...(fallbackAttributes.analytics || {}),
        ...(attributes.analytics || {}),
    };

    const socialLinks = asArray(
        attributes.socialLinks !== undefined
            ? attributes.socialLinks
            : fallbackAttributes.socialLinks !== undefined
                ? fallbackAttributes.socialLinks
                : globalAttributes.socialLinks,
        'socialLinks'
    );

    return {
        site,
        brand,
        profile,
        theme,
        navigation,
        analytics,
        socialLinks,
    };
};

const siteConfigCache = {};

export const getSiteConfig = (locale = fallbackLocale) => {
    const targetLocale = rawConfigsByLocale[locale] ? locale : fallbackLocale;
    if (siteConfigCache[targetLocale]) {
        return siteConfigCache[targetLocale];
    }

    const raw = rawConfigsByLocale[targetLocale] || {};
    const fallbackRaw = rawConfigsByLocale[fallbackLocale] || {};
    const config = buildSiteConfig(raw, targetLocale === fallbackLocale ? {} : fallbackRaw);
    siteConfigCache[targetLocale] = config;
    return config;
};

export const getNavigationItems = (locale = fallbackLocale) => {
    const config = getSiteConfig(locale);
    return asArray(config.navigation.items, 'navigation.items')
        .filter((item) => {
            if (!knownSectionIds.includes(item.id)) {
                warnContentIssue(`navigation.items contains unknown section id "${item.id}".`);
                return false;
            }

            return item.enabled !== false;
        });
};

// Static default objects initialized with fallback locale for backward compatibility
export const siteConfig = getSiteConfig(fallbackLocale);
export const navigationItems = getNavigationItems(fallbackLocale);

export const themePresets = siteConfig.theme.availablePresets?.length
    ? siteConfig.theme.availablePresets
    : defaultThemePresets;

if (siteConfig.theme.preset && !themePresets.includes(siteConfig.theme.preset)) {
    warnContentIssue(`theme.preset "${siteConfig.theme.preset}" is not listed in theme.availablePresets.`);
}

const setMetaContent = (selector, content) => {
    if (!content) {
        return;
    }

    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute('content', content);
    }
};

const setIconHref = (selector, href) => {
    if (!href) {
        return;
    }

    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute('href', href);
    }
};

export const applySiteMetadata = (locale = fallbackLocale) => {
    const config = getSiteConfig(locale);
    document.documentElement.lang = config.site.language || locale || 'en';
    document.title = config.site.title || 'EasyHomePage';
    setMetaContent('meta[name="description"]', config.site.description);
    setIconHref('link[rel="icon"]', resolveContentAsset(config.brand.favicon));
};
