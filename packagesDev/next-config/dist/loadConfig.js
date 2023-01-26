"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const cosmiconfig_1 = require("cosmiconfig");
const cosmiconfig_typescript_loader_1 = require("cosmiconfig-typescript-loader");
function loadConfig() {
    const moduleName = 'graphcommerce';
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    const result = (0, cosmiconfig_1.cosmiconfigSync)('config', {
        loaders: { '.ts': (0, cosmiconfig_typescript_loader_1.TypeScriptLoader)() },
        searchPlaces: [
            'package.json',
            `.${moduleName}rc`,
            `.${moduleName}rc.json`,
            `.${moduleName}rc.yaml`,
            `.${moduleName}rc.yml`,
            `.${moduleName}rc.js`,
            `.${moduleName}rc.ts`,
            `.${moduleName}rc.cjs`,
            `${moduleName}.config.js`,
            `${moduleName}.config.ts`,
            `${moduleName}.config.cjs`,
        ],
    }).search();
    if (!result)
        throw Error("Couldn't find a graphcommerce.config.ts file");
    return result.config;
}
exports.loadConfig = loadConfig;
