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
    return (dependency) => {
        let dependencyPaths = {
            root: '.',
            dependency,
            fromRoot: dependency,
            fromModule: dependency,
            denormalized: dependency,
        };
        dependencies.forEach((root, depCandidate) => {
            if (dependency === depCandidate || dependency.startsWith(`${depCandidate}/`)) {
                const relative = dependency.replace(depCandidate, '');
                const rootCandidate = dependency.replace(depCandidate, root);
                const fromRoot = [
                    `${rootCandidate}`,
                    `${rootCandidate}/index`,
                    `${rootCandidate}/src/index`,
                ].find((location) => ['ts', 'tsx'].find((extension) => node_fs_1.default.existsSync(`${location}.${extension}`)));
                if (!fromRoot)
                    throw Error("Can't find plugin target");
                const denormalized = fromRoot.replace(root, depCandidate);
                let fromModule = !relative
                    ? '.'
                    : `./${relative.split('/')[relative.split('/').length - 1]}`;
                if (dependency.startsWith('./'))
                    fromModule = `.${relative}`;
                dependencyPaths = { root, dependency, denormalized, fromRoot, fromModule };
            }
        });
        return dependencyPaths;
    };
};
exports.resolveDependency = resolveDependency;
