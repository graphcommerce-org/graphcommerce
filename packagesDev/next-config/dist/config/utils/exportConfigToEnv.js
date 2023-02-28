"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportConfigToEnv = void 0;
const mergeEnvIntoConfig_1 = require("./mergeEnvIntoConfig");
const fmt = (value) => {
    let formattedValue = value;
    if (typeof formattedValue === 'boolean') {
        formattedValue = formattedValue ? '1' : '0';
    }
    if (typeof formattedValue === 'object') {
        formattedValue = JSON.stringify(formattedValue);
    }
    return formattedValue;
};
function exportConfigToEnv(config) {
    let env = '';
    Object.entries(config).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((val, idx) => {
                env += `${(0, mergeEnvIntoConfig_1.toEnvStr)([key, `${idx}`])}='${fmt(val)}'\n`;
            });
        }
        else {
            env += `${(0, mergeEnvIntoConfig_1.toEnvStr)([key])}='${fmt(value)}'\n`;
        }
    });
    return env;
}
exports.exportConfigToEnv = exportConfigToEnv;
