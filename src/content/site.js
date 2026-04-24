import { attributes } from '/site/config.md';

const siteAssets = import.meta.glob('/site/assets/**/*.{png,jpg,jpeg,webp,svg,ico}', {
    eager: true,
    import: 'default',
    query: '?url',
});

const defaultThemePresets = ['graphite', 'violet', 'ocean', 'forest', 'rose'];

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

export const siteConfig = {
    site: {
        title: 'EasyHomePage',
        description: '',
        language: 'zh-CN',
        loadingTitle: 'Loading',
        loadingDescription: '',
        ...(attributes.site || {}),
    },
    brand: {
        name: 'JN',
        logo: 'assets/logo.png',
        avatar: 'assets/memoji.png',
        favicon: '/favicon.ico',
        ...(attributes.brand || {}),
    },
    profile: {
        birthDate: '',
        ...(attributes.profile || {}),
        version: {
            enabled: false,
            title: '',
            prefix: '',
            ...((attributes.profile || {}).version || {}),
        },
    },
    theme: {
        preset: 'graphite',
        availablePresets: defaultThemePresets,
        ...(attributes.theme || {}),
    },
    navigation: {
        items: [],
        ...(attributes.navigation || {}),
    },
    analytics: {
        enabled: false,
        provider: '',
        app: 'EasyHomePage',
        measurementIds: [],
        ...(attributes.analytics || {}),
    },
    socialLinks: attributes.socialLinks || [],
};

export const navigationItems = (siteConfig.navigation.items || []).filter((item) => item.enabled !== false);

export const themePresets = siteConfig.theme.availablePresets?.length
    ? siteConfig.theme.availablePresets
    : defaultThemePresets;

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

export const applySiteMetadata = () => {
    document.documentElement.lang = siteConfig.site.language || 'zh-CN';
    document.title = siteConfig.site.title || 'EasyHomePage';
    setMetaContent('meta[name="description"]', siteConfig.site.description);
    setIconHref('link[rel="icon"]', resolveContentAsset(siteConfig.brand.favicon));
};
