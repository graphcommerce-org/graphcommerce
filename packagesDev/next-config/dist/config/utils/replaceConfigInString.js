"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceConfigInString = void 0;
const configToImportMeta_1 = require("./configToImportMeta");
function replaceConfigInString(str, config) {
    let result = str;
    const replacers = (0, configToImportMeta_1.configToImportMeta)(config, false);
    Object.entries(replacers).forEach(([from, to]) => {
        result = result.replace(new RegExp(`{${from}}`, 'g'), to);
    });
    return result;
}
exports.replaceConfigInString = replaceConfigInString;
