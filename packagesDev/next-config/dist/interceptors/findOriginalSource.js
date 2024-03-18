"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOriginalSource = void 0;
const path_1 = __importDefault(require("path"));
const core_1 = require("@swc/core");
const generateInterceptors_1 = require("./generateInterceptors");
function parseAndFindExport(resolved, findExport, resolve) {
    if (!resolved?.source)
        return undefined;
    const ast = (0, core_1.parseSync)(resolved.source, { syntax: 'typescript', tsx: true, comments: true });
    for (const node of ast.body) {
        if (node.type === 'ExportDeclaration') {
            switch (node.declaration.type) {
                case 'ClassDeclaration':
                case 'FunctionDeclaration':
                    if (node.declaration.identifier.value === findExport)
                        return resolved;
                    break;
                case 'VariableDeclaration':
                    for (const declaration of node.declaration.declarations) {
                        if (declaration.type === 'VariableDeclarator') {
                            if (declaration.id.type === 'Identifier') {
                                if (declaration.id.value === findExport)
                                    return resolved;
                            }
                            else {
                                console.log(declaration);
                            }
                        }
                    }
                    break;
            }
        }
    }
    for (const node of ast.body) {
        if (node.type === 'ExportAllDeclaration') {
            const isRelative = node.source.value.startsWith('.');
            if (isRelative) {
                const d = resolved.dependency === resolved.denormalized
                    ? resolved.dependency.substring(0, resolved.dependency.lastIndexOf('/'))
                    : resolved.dependency;
                const newPath = path_1.default.join(d, node.source.value);
                const resolveResult = resolve(newPath, { includeSources: true });
                // eslint-disable-next-line no-continue
                if (!resolveResult)
                    continue;
                const newResolved = parseAndFindExport(resolveResult, findExport, resolve);
                if (newResolved && resolved.dependency !== newResolved.dependency)
                    return newResolved;
            }
        }
    }
    return undefined;
}
function findOriginalSource(plug, resolved, resolve) {
    if (!resolved?.source)
        return resolved;
    const findExport = (0, generateInterceptors_1.isMethodPluginConfig)(plug) ? plug.func : plug.component;
    const result = parseAndFindExport(resolved, findExport, resolve);
    if (!result) {
        throw new Error(`Could not find original source for ${findExport}`);
    }
    return result;
}
exports.findOriginalSource = findOriginalSource;
