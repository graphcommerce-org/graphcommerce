"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDependency = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const resolveDependenciesSync_1 = require("./resolveDependenciesSync");
const resolveDependency = (cwd = process.cwd()) => {
    const dependencies = (0, resolveDependenciesSync_1.resolveDependenciesSync)(cwd);
    return (dependency, { includeSources = false } = {}) => {
        let dependencyPaths = {
            root: '.',
            source: '',
            dependency,
            fromRoot: dependency,
            fromModule: dependency,
            denormalized: dependency,
        };
        dependencies.forEach((root, depCandidate) => {
            if (dependency === depCandidate || dependency.startsWith(`${depCandidate}/`)) {
                const relative = dependency.replace(depCandidate, '');
                const rootCandidate = dependency.replace(depCandidate, root);
                let source = '';
                const fromRoot = [
                    `${rootCandidate}`,
                    `${rootCandidate}/index`,
                    `${rootCandidate}/src/index`,
                ].find((location) => ['ts', 'tsx'].find((extension) => {
                    const exists = node_fs_1.default.existsSync(`${location}.${extension}`);
                    if (includeSources && exists)
                        source = node_fs_1.default.readFileSync(`${location}.${extension}`, 'utf-8');
                    return exists;
                }));
                if (!fromRoot) {
                    throw Error(`Can't find plugin ${dependency}`);
                }
                const denormalized = fromRoot.replace(root, depCandidate);
                let fromModule = !relative
                    ? '.'
                    : `./${relative.split('/')[relative.split('/').length - 1]}`;
                if (dependency.startsWith('./'))
                    fromModule = `.${relative}`;
                dependencyPaths = { root, dependency, denormalized, fromRoot, fromModule, source };
            }
        });
        return dependencyPaths;
    };
};
exports.resolveDependency = resolveDependency;
