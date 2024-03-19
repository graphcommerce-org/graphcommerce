"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlugins = void 0;
const core_1 = require("@swc/core");
// eslint-disable-next-line import/no-extraneous-dependencies
const chalk_1 = __importDefault(require("chalk"));
const glob_1 = require("glob");
const get_1 = __importDefault(require("lodash/get"));
const extract_const_value_1 = require("next/dist/build/analysis/extract-const-value");
const resolveDependenciesSync_1 = require("../utils/resolveDependenciesSync");
const generateInterceptors_1 = require("./generateInterceptors");
function maybeExtractExportedConstValue(ast, name) {
    try {
        return (0, extract_const_value_1.extractExportedConstValue)(ast, name);
    }
    catch (e) {
        return undefined;
    }
}
function parseStructure(file) {
    const ast = (0, core_1.parseFileSync)(file, { syntax: 'typescript', tsx: true });
    const exports = {};
    const component = maybeExtractExportedConstValue(ast, 'component');
    const exported = maybeExtractExportedConstValue(ast, 'exported');
    const ifConfig = maybeExtractExportedConstValue(ast, 'ifConfig');
    const replace = maybeExtractExportedConstValue(ast, 'replace');
    console.log(component, exported, ifConfig, replace);
    ast.body.forEach((node) => {
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
        const files = (0, glob_1.sync)(`${dependency}/plugins/**/*.{ts,tsx}`, { dotRelative: true });
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
                    errors.push(`Plugin ${file} is not a valid plugin, make it has "export const exported = '@graphcommerce/my-package"`);
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
            const key = `🔌 ${chalk_1.default.greenBright(`Plugins loaded for ${plugin.exported}#${plugin.exportString}`)}`;
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
        // eslint-disable-next-line no-console
        console.log(toLog.join('\n\n'));
    }
    return [plugins, errors];
}
exports.findPlugins = findPlugins;
