import { attributes } from '/site/config.md';
import { asArray, warnContentIssue } from '@/content/guards';

const siteAssets = import.meta.glob('/site/assets/**/*.{png,jpg,jpeg,webp,svg,ico}', {
    eager: true,
    import: 'default',
    query: '?url',
});

const defaultThemePresets = ['graphite', 'violet', 'ocean', 'forest', 'rose'];
const knownSectionIds = ['Introduce', 'Stories', 'Skills', 'Jobs', 'Products', 'Works', 'Services', 'Footer'];

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
        emptyStateTitle: '暂时没有内容',
        emptyStateDescription: '在对应的 Markdown 文件里添加 items 后，这里会自动显示。',
        ...(attributes.site || {}),
    },
    brand: {
        name: 'JN',
        logo: 'assets/logo.png',
        avatar: 'assets/memoji.png',
        favicon: 'favicon.ico',
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
        customTokens: {},
        customDarkTokens: {},
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
    socialLinks: asArray(attributes.socialLinks, 'socialLinks'),
};

export const themePresets = siteConfig.theme.availablePresets?.length
    ? siteConfig.theme.availablePresets
    : defaultThemePresets;

if (siteConfig.theme.preset && !themePresets.includes(siteConfig.theme.preset)) {
    warnContentIssue(`theme.preset "${siteConfig.theme.preset}" is not listed in theme.availablePresets.`);
}

export const navigationItems = asArray(siteConfig.navigation.items, 'navigation.items')
    .filter((item) => {
        if (!knownSectionIds.includes(item.id)) {
            warnContentIssue(`navigation.items contains unknown section id "${item.id}".`);
            return false;
        }

        return item.enabled !== false;
    });

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
