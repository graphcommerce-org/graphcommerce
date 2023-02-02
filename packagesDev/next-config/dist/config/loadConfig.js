"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const cosmiconfig_1 = require("cosmiconfig");
const cosmiconfig_typescript_loader_1 = require("cosmiconfig-typescript-loader");
const config_1 = require("../generated/config");
const mergeEnvIntoConfig_1 = require("./utils/mergeEnvIntoConfig");
function loadConfig(cwd) {
    const moduleName = 'graphcommerce';
    try {
        const result = (0, cosmiconfig_1.cosmiconfigSync)('config', {
            loaders: { '.ts': (0, cosmiconfig_typescript_loader_1.TypeScriptLoader)({ transpileOnly: true }) },
            searchPlaces: [
                'package.json',
                `${moduleName}.config.js`,
                `${moduleName}.config.ts`,
                `${moduleName}.config.cjs`,
            ],
        }).search(cwd);
        if (!result)
            throw Error("Couldn't find a graphcommerce.config.ts in the project.");
        const schema = (0, config_1.GraphCommerceConfigSchema)();
        const config = schema.optional().parse(result.config);
        if (!config)
            throw Error("Couldn't find a graphcommerce.config.ts in the project.");
        const [mergedConfig, applyResult] = (0, mergeEnvIntoConfig_1.mergeEnvIntoConfig)((0, config_1.GraphCommerceConfigSchema)(), config, process.env);
        if (applyResult.length > 0)
            console.log((0, mergeEnvIntoConfig_1.formatAppliedEnv)(applyResult));
        return schema.parse(mergedConfig);
    }
    catch (error) {
        if (error instanceof Error) {
            // console.log(error.message)
            process.exit(1);
        }
        throw error;
    }
}
exports.loadConfig = loadConfig;
