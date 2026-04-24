import { attributes as footerAttributes } from '/site/sections/footer.md';
import { attributes as introduceAttributes, html as introduceHtml } from '/site/sections/introduce.md';
import { attributes as jobsAttributes } from '/site/sections/jobs.md';
import { attributes as productsAttributes } from '/site/sections/products.md';
import { attributes as servicesAttributes } from '/site/sections/services.md';
import { attributes as skillsAttributes } from '/site/sections/skills.md';
import { attributes as storiesAttributes } from '/site/sections/stories.md';
import { attributes as worksAttributes } from '/site/sections/works.md';
import { formatListHtml, renderContent, renderMarkdown } from '@/lib/markdown';
import { asArray, requireFields } from '@/content/guards';

const productImages = import.meta.glob('/site/assets/products/*', { eager: true });

const sortByDateDesc = (items = []) => {
    return [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
};

const sortByYearDesc = (items = []) => {
    return [...items].sort((a, b) => Number(b.date || 0) - Number(a.date || 0));
};

const resolveProductCover = (cover) => {
    const imagePathKey = Object.keys(productImages).find((key) => key.endsWith(`/${cover}`));
    return imagePathKey ? productImages[imagePathKey].default : cover;
};

export const introduceSection = {
    ...introduceAttributes,
    html: formatListHtml(introduceHtml, 'content-check'),
};

export const storiesSection = {
    ...storiesAttributes,
    items: asArray(storiesAttributes.items, 'stories.items').map((item, index) => {
        const safeItem = item || {};
        requireFields(safeItem, ['content'], `stories.items[${index}]`);
        return {
            ...safeItem,
            tags: asArray(safeItem.tags, `stories.items[${index}].tags`),
            html: renderMarkdown(safeItem.content || ''),
        };
    }),
};

export const skillsSection = {
    ...skillsAttributes,
    descriptionHtml: renderContent(skillsAttributes.description || '', 'content-dot ml-4 mt-2 text-panel-muted'),
    items: asArray(skillsAttributes.items, 'skills.items').map((item, index) => {
        const safeItem = item || {};
        requireFields(safeItem, ['title'], `skills.items[${index}]`);
        return {
            ...safeItem,
            tags: asArray(safeItem.tags, `skills.items[${index}].tags`),
            level: Number(safeItem.level || 0),
            html: renderContent(safeItem.content || ''),
        };
    }),
};

export const jobsSection = {
    ...jobsAttributes,
    descriptionHtml: renderContent(jobsAttributes.description || '', 'content-dot ml-4 mt-2 text-muted-foreground'),
    items: sortByDateDesc(asArray(jobsAttributes.items, 'jobs.items')).map((item, index) => {
        const safeItem = item || {};
        requireFields(safeItem, ['title', 'company'], `jobs.items[${index}]`);
        return {
            ...safeItem,
            html: renderContent(safeItem.content || '', 'content-arrow'),
        };
    }),
};

export const productsSection = {
    ...productsAttributes,
    items: sortByYearDesc(asArray(productsAttributes.items, 'products.items')).map((item, index) => {
        const safeItem = item || {};
        requireFields(safeItem, ['title', 'cover'], `products.items[${index}]`);
        return {
            ...safeItem,
            tags: asArray(safeItem.tags, `products.items[${index}].tags`),
            cover: resolveProductCover(safeItem.cover),
            html: renderContent(safeItem.content || '', 'content-dot'),
        };
    }),
};

export const worksSection = {
    ...worksAttributes,
    items: sortByDateDesc(asArray(worksAttributes.items, 'works.items')).map((item, index) => {
        const safeItem = item || {};
        requireFields(safeItem, ['title'], `works.items[${index}]`);
        return {
            ...safeItem,
            tags: asArray(safeItem.tags, `works.items[${index}].tags`),
            html: renderContent(safeItem.content || ''),
        };
    }),
};

export const servicesSection = {
    ...servicesAttributes,
    items: asArray(servicesAttributes.items, 'services.items').map((item, index) => {
        const safeItem = item || {};
        requireFields(safeItem, ['title'], `services.items[${index}]`);
        return {
            ...safeItem,
            includes: asArray(safeItem.includes, `services.items[${index}].includes`),
            excludes: asArray(safeItem.excludes, `services.items[${index}].excludes`),
        };
    }),
};

export const footerSection = {
    ...footerAttributes,
};
