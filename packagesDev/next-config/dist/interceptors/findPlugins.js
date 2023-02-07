"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlugins = void 0;
const core_1 = require("@swc/core");
// eslint-disable-next-line import/no-extraneous-dependencies
const glob_1 = __importDefault(require("glob"));
const resolveDependenciesSync_1 = require("../utils/resolveDependenciesSync");
function parseStructure(file) {
    const ast = (0, core_1.parseFileSync)(file, { syntax: 'typescript', tsx: true });
    // const ast = swc.parseFileSync(file, { syntax: 'typescript' })
    const imports = {};
    const exports = {};
    ast.body.forEach((node) => {
        switch (node.type) {
            case 'ImportDeclaration':
                node.specifiers.forEach((s) => {
                    if (s.type === 'ImportSpecifier') {
                        imports[s.local.value] = node.source.value;
                    }
                });
                break;
            case 'ExportDeclaration':
                switch (node.declaration.type) {
                    case 'VariableDeclaration':
                        node.declaration.declarations.forEach((declaration) => {
                            if (declaration.id.type !== 'Identifier')
                                return;
                            switch (declaration.init?.type) {
                                case 'StringLiteral':
                                    exports[declaration.id.value] = declaration.init.value;
                                    break;
                            }
                        });
                        break;
                    case 'FunctionDeclaration':
                        if (node.declaration.type === 'FunctionDeclaration') {
                            // console.log('func', node.declaration)
                        }
                        break;
                    default:
                        console.log('unknown', node.declaration);
                }
                break;
            // default:
            // console.log('hallo', node)
        }
    });
    return exports;
}
function findPlugins(cwd = process.cwd()) {
    const dependencies = (0, resolveDependenciesSync_1.resolveDependenciesSync)(cwd);
    const plugins = [];
    dependencies.forEach((dependency, path) => {
        const files = glob_1.default.sync(`${dependency}/plugins/**/*.tsx`);
        files.forEach((file) => {
            try {
                const result = parseStructure(file);
                if (!result)
                    return;
                // if (result.ifEnv && !process.env[result.ifEnv]) return
                plugins.push({ ...result, plugin: file.replace(dependency, path).replace('.tsx', '') });
            }
            catch (e) {
                console.error(`Error parsing ${file}`, e);
            }
        });
    });
    return plugins;
}
exports.findPlugins = findPlugins;
