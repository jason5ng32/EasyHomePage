const reportedIssues = new Set();

export const warnContentIssue = (message) => {
    if (reportedIssues.has(message)) {
        return;
    }

    reportedIssues.add(message);
    console.warn(`[EasyHomePage content] ${message}`);
};

export const asArray = (value, context) => {
    if (value === undefined || value === null) {
        return [];
    }

    if (Array.isArray(value)) {
        return value;
    }

    warnContentIssue(`${context} should be an array.`);
    return [];
};

export const requireFields = (item = {}, fields = [], context = 'item') => {
    fields.forEach((field) => {
        if (item[field] === undefined || item[field] === null || item[field] === '') {
            warnContentIssue(`${context} is missing required field "${field}".`);
        }
    });
};
