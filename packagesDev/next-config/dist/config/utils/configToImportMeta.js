"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configToImportMeta = void 0;
function flattenKeys(value, initialPathPrefix) {
    // Is a scalar:
    if (value === null || value === undefined || typeof value === 'number') {
        return { [initialPathPrefix]: value };
    }
    if (typeof value === 'string') {
        return { [initialPathPrefix]: JSON.stringify(value) };
    }
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return { [initialPathPrefix]: JSON.stringify(value) };
    }
    if (typeof value === 'object') {
        return {
            [initialPathPrefix]: process.env.NODE_ENV === 'development'
                ? `{ __debug: "'${initialPathPrefix}' can not be destructured, please access deeper properties directly" }`
                : '{}',
            ...Object.keys(value)
                .map((key) => {
                const deep = value[key];
                return flattenKeys(deep, `${initialPathPrefix}.${key}`);
            })
                .reduce((acc, path) => ({ ...acc, ...path })),
        };
    }
    throw Error(`Unexpected value: ${value}`);
}
/** The result of this function is passed to the webpack DefinePlugin as import.meta.graphCommerce.* */
function configToImportMeta(config) {
    return flattenKeys(config, 'import.meta.graphCommerce');
}
exports.configToImportMeta = configToImportMeta;
