"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findConfig = findConfig;
/* eslint-disable import/no-extraneous-dependencies */
const path_1 = __importDefault(require("path"));
const utils_1 = require("@graphql-mesh/utils");
const cosmiconfig_1 = require("cosmiconfig");
function customLoader(ext, importFn = utils_1.defaultImportFn, initialLoggerPrefix = '🕸️  Mesh') {
    const logger = new utils_1.DefaultLogger(initialLoggerPrefix).child('config');
    // eslint-disable-next-line consistent-return
    function loader(filepath, content) {
        if (process.env) {
            // eslint-disable-next-line no-param-reassign
            content = content.replace(/\$\{(.*?)\}/g, (_, variable) => {
                let varName = variable;
                let defaultValue = '';
                if (variable.includes(':')) {
                    const spl = variable.split(':');
                    varName = spl.shift();
                    defaultValue = spl.join(':');
                }
                return process.env[varName] || defaultValue;
            });
        }
        if (ext === 'json') {
            return cosmiconfig_1.defaultLoaders['.json'](filepath, content);
        }
        if (ext === 'yaml') {
            return (0, utils_1.loadYaml)(filepath, content, logger);
        }
        if (ext === 'js') {
            return importFn(filepath);
        }
    }
    return loader;
}
async function findConfig(options) {
    const { configName = 'mesh', dir: configDir = '', initialLoggerPrefix } = options || {};
    const dir = path_1.default.isAbsolute(configDir) ? configDir : path_1.default.join(process.cwd(), configDir);
    const explorer = (0, cosmiconfig_1.cosmiconfig)(configName, {
        searchPlaces: [
            'package.json',
            `.${configName}rc`,
            `.${configName}rc.json`,
            `.${configName}rc.yaml`,
            `.${configName}rc.yml`,
            `.${configName}rc.js`,
            `.${configName}rc.ts`,
            `.${configName}rc.cjs`,
            `${configName}.config.js`,
            `${configName}.config.cjs`,
        ],
        loaders: {
            '.json': customLoader('json', options?.importFn, initialLoggerPrefix),
            '.yaml': customLoader('yaml', options?.importFn, initialLoggerPrefix),
            '.yml': customLoader('yaml', options?.importFn, initialLoggerPrefix),
            '.js': customLoader('js', options?.importFn, initialLoggerPrefix),
            '.ts': customLoader('js', options?.importFn, initialLoggerPrefix),
            noExt: customLoader('yaml', options?.importFn, initialLoggerPrefix),
        },
    });
    const results = await explorer.search(dir);
    if (!results) {
        throw new Error(`No ${configName} config file found in "${dir}"!`);
    }
    const { config } = results;
    return config;
}
