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
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const cosmiconfig_1 = require("cosmiconfig");
const config_1 = require("../generated/config");
const demoConfig_1 = require("./demoConfig");
const mergeEnvIntoConfig_1 = require("./utils/mergeEnvIntoConfig");
const rewriteLegacyEnv_1 = require("./utils/rewriteLegacyEnv");
__exportStar(require("./utils/configToImportMeta"), exports);
__exportStar(require("./utils/replaceConfigInString"), exports);
const moduleName = 'graphcommerce';
const loader = (0, cosmiconfig_1.cosmiconfigSync)(moduleName);
function loadConfig(cwd) {
    const isMainProcess = !process.send;
    try {
        const result = loader.search(cwd);
        let confFile = result?.config;
        if (!confFile) {
            if (isMainProcess)
                console.warn('No graphcommerce.config.js found in the project, using demo config');
            confFile = demoConfig_1.demoConfig;
        }
        confFile ||= {};
        const schema = (0, config_1.GraphCommerceConfigSchema)();
        const [mergedConfig, applyResult] = (0, rewriteLegacyEnv_1.rewriteLegacyEnv)(schema, process.env, 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        confFile);
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
                console.log('Error while parsing graphcommerce.config.js', error.message);
                process.exit(1);
            }
        }
        throw error;
    }
}
exports.loadConfig = loadConfig;
