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

// 支持多语言目录与向下兼容单语言根目录
const multiConfigModules = import.meta.glob('/site/*/config.md', { eager: true });
const legacyConfigModules = import.meta.glob('/site/config.md', { eager: true });

const rawConfigsByLocale = {};
const detectedLocales = [];

// 优先扫描 site/{locale}/config.md
for (const [pathKey, module] of Object.entries(multiConfigModules)) {
    const match = pathKey.match(/^\/site\/([^/]+)\/config\.md$/);
    if (match) {
        const locale = match[1];
        detectedLocales.push(locale);
        rawConfigsByLocale[locale] = module.attributes || {};
    }
}

// 若无多语言子目录，回退至单语言 site/config.md
const isMultiLocale = detectedLocales.length > 0;
if (!isMultiLocale && legacyConfigModules['/site/config.md']) {
    const legacyAttr = legacyConfigModules['/site/config.md'].attributes || {};
    const fallbackCode = legacyAttr.site?.language || 'zh-CN';
    detectedLocales.push(fallbackCode);
    rawConfigsByLocale[fallbackCode] = legacyAttr;
}

export { isMultiLocale };

// 保证英文优先或默认排序
export const fallbackLocale = detectedLocales.includes('en')
    ? 'en'
    : (detectedLocales[0] || 'en');

// 可用语言列表
export const availableLocales = detectedLocales.map((locale) => {
    const raw = rawConfigsByLocale[locale] || {};
    const configuredName = raw.site?.languageName;
    const configuredShort = raw.site?.languageShort;
    const fallbackMeta = defaultLocaleMetadata[locale] || { name: locale, short: locale.toUpperCase() };

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
        language: 'en',
        loadingTitle: 'Loading',
        loadingDescription: '',
        emptyStateTitle: 'No content yet',
        emptyStateDescription: 'Items will automatically appear here once added to the corresponding Markdown file.',
        ...(fallbackAttributes.site || {}),
        ...(attributes.site || {}),
    };

    const brand = {
        name: 'JN',
        logo: 'assets/logo.png',
        avatar: 'assets/memoji.png',
        favicon: 'favicon.ico',
        ...(fallbackAttributes.brand || {}),
        ...(attributes.brand || {}),
    };

    const profile = {
        birthDate: '',
        ...(fallbackAttributes.profile || {}),
        ...(attributes.profile || {}),
        version: {
            enabled: false,
            title: '',
            prefix: '',
            ...((fallbackAttributes.profile || {}).version || {}),
            ...((attributes.profile || {}).version || {}),
        },
    };

    const theme = {
        preset: 'graphite',
        availablePresets: defaultThemePresets,
        customTokens: {},
        customDarkTokens: {},
        ...(fallbackAttributes.theme || {}),
        ...(attributes.theme || {}),
    };

    const navigation = {
        items: [],
        ...(fallbackAttributes.navigation || {}),
        ...(attributes.navigation || {}),
    };

    const analytics = {
        enabled: false,
        provider: '',
        app: 'EasyHomePage',
        measurementIds: [],
        ...(fallbackAttributes.analytics || {}),
        ...(attributes.analytics || {}),
    };

    const socialLinks = asArray(
        attributes.socialLinks !== undefined ? attributes.socialLinks : fallbackAttributes.socialLinks,
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

// 默认向后兼容的静态对象（以 fallback 语言初始化）
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
