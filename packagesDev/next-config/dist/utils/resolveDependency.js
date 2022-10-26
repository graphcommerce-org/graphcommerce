"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDependency = void 0;
const resolveDependenciesSync_1 = require("./resolveDependenciesSync");
const resolveDependency = (cwd = process.cwd()) => {
    const dependencies = (0, resolveDependenciesSync_1.resolveDependenciesSync)(cwd);
    return (dependency) => {
        let dependencyPaths = { root: '.', dependency, fromRoot: dependency, fromModule: dependency };
        dependencies.forEach((root, depCandidate) => {
            if (dependency.startsWith(depCandidate)) {
                const relative = dependency.replace(depCandidate, '');
                const fromRoot = dependency.replace(depCandidate, root);
                dependencyPaths = {
                    root,
                    dependency,
                    fromRoot,
                    fromModule: !relative ? '.' : `./${relative.split('/')[relative.split('/').length - 1]}`,
                };
            }
        });
        return dependencyPaths;
    };
};
exports.resolveDependency = resolveDependency;
