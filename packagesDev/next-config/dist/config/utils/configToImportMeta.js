"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configToImportMeta = void 0;
function flattenKeys(value, initialPathPrefix, stringify) {
    // Is a scalar:
    if (value === null || value === undefined || typeof value === 'number') {
        return { [initialPathPrefix]: value };
    }
    if (typeof value === 'string') {
        return { [initialPathPrefix]: stringify ? JSON.stringify(value) : value };
    }
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return {
            [initialPathPrefix]: stringify || Array.isArray(value) ? JSON.stringify(value) : value,
        };
    }
    if (typeof value === 'object') {
        return {
            [initialPathPrefix]: process.env.NODE_ENV !== 'production'
                ? `{ __debug: "'${initialPathPrefix}' can not be destructured, please access deeper properties directly" }`
                : '{}',
            ...Object.keys(value)
                .map((key) => {
                const deep = value[key];
                return flattenKeys(deep, `${initialPathPrefix}.${key}`, stringify);
            })
                .reduce((acc, path) => ({ ...acc, ...path })),
        };
    }
    throw Error(`Unexpected value: ${value}`);
}
/** The result of this function is passed to the webpack DefinePlugin as import.meta.graphCommerce.* */
function configToImportMeta(config, stringify = true) {
    return flattenKeys(config, 'import.meta.graphCommerce', stringify);
}
exports.configToImportMeta = configToImportMeta;
