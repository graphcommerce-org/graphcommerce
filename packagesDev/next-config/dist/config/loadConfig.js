"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const cosmiconfig_1 = require("cosmiconfig");
const config_1 = require("../generated/config");
const demoConfig_1 = require("./demoConfig");
const mergeEnvIntoConfig_1 = require("./utils/mergeEnvIntoConfig");
const rewriteLegacyEnv_1 = require("./utils/rewriteLegacyEnv");
__exportStar(require("./utils/configToImportMeta"), exports);
const moduleName = 'graphcommerce';
const loader = (0, cosmiconfig_1.cosmiconfigSync)(moduleName);
function loadConfig(cwd) {
    const isMainProcess = !process.send;
    try {
        const result = loader.search(cwd);
        let confFile = result?.config;
        const hasEnv = Object.keys((0, mergeEnvIntoConfig_1.filterEnv)(process.env)).length > 0;
        if (!confFile && !hasEnv) {
            if (isMainProcess)
                console.warn('No graphcommerce.config.js or environment variables found in the project, using demo config');
            confFile = demoConfig_1.demoConfig;
        }
        confFile ||= {};
        const schema = (0, config_1.GraphCommerceConfigSchema)();
        const parsed = schema.safeParse(confFile);
        const [mergedConfig, applyResult] = (0, rewriteLegacyEnv_1.rewriteLegacyEnv)((0, config_1.GraphCommerceConfigSchema)(), parsed.success ? parsed.data : {}, process.env);
        if (applyResult.length > 0 && isMainProcess)
            console.log((0, mergeEnvIntoConfig_1.formatAppliedEnv)(applyResult));
        const finalParse = schema.parse(mergedConfig);
        if (process.env.DEBUG && isMainProcess) {
            console.log('Parsed configuration');
            console.log(finalParse);
        }
        return finalParse;
    }
    catch (error) {
        if (error instanceof Error) {
            if (isMainProcess) {
                console.log(error.message);
                process.exit(1);
            }
        }
        throw error;
    }
}
exports.loadConfig = loadConfig;
