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
    function resolve(dependency, options = {}) {
        const { includeSources = false } = options;
        let dependencyPaths = {
            root: '.',
            source: '',
            sourcePath: '',
            sourcePathRelative: '',
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
                let sourcePath = '';
                const fromRoot = [
                    `${rootCandidate}`,
                    `${rootCandidate}/index`,
                    `${rootCandidate}/src/index`,
                ].find((location) => ['ts', 'tsx'].find((extension) => {
                    const candidatePath = `${location}.${extension}`;
                    const exists = node_fs_1.default.existsSync(candidatePath);
                    if (includeSources && exists) {
                        source = node_fs_1.default.readFileSync(candidatePath, 'utf-8');
                        sourcePath = candidatePath;
                    }
                    return exists;
                }));
                if (!fromRoot) {
                    return;
                }
                const denormalized = fromRoot.replace(root, depCandidate);
                let fromModule = !relative
                    ? '.'
                    : `./${relative.split('/')[relative.split('/').length - 1]}`;
                const sourcePathRelative = !sourcePath
                    ? '.'
                    : `./${sourcePath.split('/')[sourcePath.split('/').length - 1]}`;
                if (dependency.startsWith('./'))
                    fromModule = `.${relative}`;
                dependencyPaths = {
                    root,
                    dependency,
                    denormalized,
                    fromRoot,
                    fromModule,
                    source,
                    sourcePath,
                    sourcePathRelative,
                };
            }
        });
        return dependencyPaths;
    }
    return resolve;
};
exports.resolveDependency = resolveDependency;
