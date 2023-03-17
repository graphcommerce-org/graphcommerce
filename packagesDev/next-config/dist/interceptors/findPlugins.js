"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlugins = void 0;
const console_1 = require("console");
const stream_1 = require("stream");
const core_1 = require("@swc/core");
// eslint-disable-next-line import/no-extraneous-dependencies
const glob_1 = __importDefault(require("glob"));
const get_1 = __importDefault(require("lodash/get"));
const diff_1 = __importDefault(require("../config/utils/diff"));
const resolveDependenciesSync_1 = require("../utils/resolveDependenciesSync");
function table(input) {
    // @see https://stackoverflow.com/a/67859384
    const ts = new stream_1.Transform({
        transform(chunk, enc, cb) {
            cb(null, chunk);
        },
    });
    const logger = new console_1.Console({ stdout: ts });
    logger.table(input);
    const t = (ts.read() || '').toString();
    let result = '';
    for (const row of t.split(/[\r\n]+/)) {
        let r = row.replace(/[^┬]*┬/, '┌');
        r = r.replace(/^├─*┼/, '├');
        r = r.replace(/│[^│]*/, '');
        r = r.replace(/^└─*┴/, '└');
        r = r.replace(/'/g, ' ');
        result += `${r}\n`;
    }
    console.log(result);
}
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
let prevlog;
function findPlugins(config, cwd = process.cwd()) {
    const dependencies = (0, resolveDependenciesSync_1.resolveDependenciesSync)(cwd);
    const debug = Boolean(config.debug?.pluginStatus);
    if (debug)
        console.time('findPlugins');
    const plugins = [];
    dependencies.forEach((dependency, path) => {
        const files = glob_1.default.sync(`${dependency}/plugins/**/*.tsx`);
        files.forEach((file) => {
            try {
                const result = parseStructure(file);
                if (!result)
                    return;
                plugins.push({
                    plugin: file.replace(dependency, path).replace('.tsx', ''),
                    ...result,
                    enabled: !result.ifConfig || Boolean((0, get_1.default)(config, result.ifConfig)),
                });
            }
            catch (e) {
                console.error(`Error parsing ${file}`, e);
            }
        });
    });
    if (debug) {
        const formatted = plugins.map(({ plugin, component, ifConfig, enabled, exported }) => ({
            '💉': enabled ? '✅' : '❌',
            Reason: `${ifConfig ? `${ifConfig}` : ''}`,
            Plugin: plugin,
            Target: `${exported}#${component}`,
        }));
        const res = (0, diff_1.default)(prevlog, formatted);
        if (res) {
            table(formatted);
        }
        prevlog = formatted;
        console.timeEnd('findPlugins');
    }
    return plugins;
}
exports.findPlugins = findPlugins;
