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
const mergeEnvIntoConfig_1 = require("./utils/mergeEnvIntoConfig");
const rewriteLegacyEnv_1 = require("./utils/rewriteLegacyEnv");
__exportStar(require("./utils/configToImportMeta"), exports);
const moduleName = 'graphcommerce';
const loader = (0, cosmiconfig_1.cosmiconfigSync)(moduleName);
function loadConfig(cwd) {
    try {
        const result = loader.search(cwd);
        if (!result)
            throw Error("Couldn't find a graphcommerce.config.(m)js in the project.");
        const schema = (0, config_1.GraphCommerceConfigSchema)();
        const config = schema.parse(result.config);
        if (!config)
            throw Error("Couldn't find a graphcommerce.config.(m)js in the project.");
        const [mergedConfig, applyResult] = (0, rewriteLegacyEnv_1.rewriteLegacyEnv)((0, config_1.GraphCommerceConfigSchema)(), config, process.env);
        if (applyResult.length > 0)
            console.log((0, mergeEnvIntoConfig_1.formatAppliedEnv)(applyResult));
        return schema.parse(mergedConfig);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            process.exit(1);
        }
        throw error;
    }
}
exports.loadConfig = loadConfig;
