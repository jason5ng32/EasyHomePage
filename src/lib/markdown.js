import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({
    breaks: true,
    linkify: true,
});

export const renderMarkdown = (content = '') => markdown.render(content || '');

export const formatListHtml = (html = '', markerClass = 'content-dot') => {
    return html.toString()
        .replace(/<li>/g, `<p class="${markerClass}">`)
        .replace(/<\/li>/g, '</p>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};

export const renderContent = (content = '', markerClass = '') => {
    const html = renderMarkdown(content);
    return markerClass ? formatListHtml(html, markerClass) : html;
};
