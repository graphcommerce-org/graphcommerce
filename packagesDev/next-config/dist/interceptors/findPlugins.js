"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlugins = void 0;
const core_1 = require("@swc/core");
// eslint-disable-next-line import/no-extraneous-dependencies
const chalk_1 = __importDefault(require("chalk"));
// eslint-disable-next-line import/no-extraneous-dependencies
const glob_1 = __importDefault(require("glob"));
const get_1 = __importDefault(require("lodash/get"));
const resolveDependenciesSync_1 = require("../utils/resolveDependenciesSync");
const generateInterceptors_1 = require("./generateInterceptors");
function parseStructure(file) {
    const ast = (0, core_1.parseFileSync)(file, { syntax: 'typescript', tsx: true });
    const imports = {};
    const exports = {};
    ast.body.forEach((node) => {
        if (node.type === 'ImportDeclaration') {
            node.specifiers.forEach((s) => {
                if (s.type === 'ImportSpecifier') {
                    imports[s.local.value] = node.source.value;
                }
            });
        }
        if (node.type === 'ExportDeclaration' && node.declaration.type === 'VariableDeclaration') {
            node.declaration.declarations.forEach((declaration) => {
                if (declaration.init?.type === 'StringLiteral' && declaration.id.type === 'Identifier') {
                    exports[declaration.id.value] = declaration.init.value;
                }
            });
        }
    });
    return exports;
}
const pluginLogs = {};
function findPlugins(config, cwd = process.cwd()) {
    const dependencies = (0, resolveDependenciesSync_1.resolveDependenciesSync)(cwd);
    const debug = Boolean(config.debug?.pluginStatus);
    const errors = [];
    const plugins = [];
    dependencies.forEach((dependency, path) => {
        const files = glob_1.default.sync(`${dependency}/plugins/**/*.{ts,tsx}`);
        files.forEach((file) => {
            try {
                const result = parseStructure(file);
                if (!result)
                    return;
                const pluginConfig = {
                    plugin: file.replace(dependency, path).replace('.tsx', '').replace('.ts', ''),
                    ...result,
                    enabled: !result.ifConfig || Boolean((0, get_1.default)(config, result.ifConfig)),
                };
                if (!(0, generateInterceptors_1.isPluginConfig)(pluginConfig)) {
                    if (!(0, generateInterceptors_1.isPluginBaseConfig)(pluginConfig))
                        errors.push(`Plugin ${file} is not a valid plugin, make it has "export const exported = '@graphcommerce/my-package"`);
                    else if (file.endsWith('.ts')) {
                        errors.push(`Plugin ${file} is not a valid plugin, please define the method to create a plugin for "export const method = 'someMethod'"`);
                    }
                    else if (file.endsWith('.tsx')) {
                        errors.push(`Plugin ${file} is not a valid plugin, please define the compoennt to create a plugin for "export const component = 'SomeComponent'"`);
                    }
                }
                else {
                    plugins.push(pluginConfig);
                }
            }
            catch (e) {
                console.error(`Error parsing ${file}`, e);
            }
        });
    });
    if (process.env.NODE_ENV === 'development' && debug) {
        const byExported = plugins.reduce((acc, plugin) => {
            const componentStr = (0, generateInterceptors_1.isReactPluginConfig)(plugin) ? plugin.component : '';
            const funcStr = (0, generateInterceptors_1.isMethodPluginConfig)(plugin) ? plugin.func : '';
            const key = `🔌 ${chalk_1.default.greenBright(`Plugins loaded for ${plugin.exported}#${componentStr}${funcStr}`)}`;
            if (!acc[key])
                acc[key] = [];
            acc[key].push(plugin);
            return acc;
        }, {});
        const toLog = [];
        Object.entries(byExported).forEach(([key, p]) => {
            const logStr = p
                .filter((c) => debug || c.enabled)
                .map((c) => `${c.enabled ? `🟢` : `⚪️`} ${c.plugin} ${c.ifConfig ? `(${c.ifConfig}: ${c.enabled ? 'true' : 'false'})` : ''}`)
                .join('\n');
            if (logStr && pluginLogs[key] !== logStr) {
                toLog.push(`${key}\n${logStr}`);
                pluginLogs[key] = logStr;
            }
        });
        console.log(toLog.join('\n\n'));
    }
    return [plugins, errors];
}
exports.findPlugins = findPlugins;
