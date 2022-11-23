"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDependenciesSync = exports.sortDependencies = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const PackagesSort_1 = require("./PackagesSort");
const resolveCache = new Map();
function resolveRecursivePackageJson(packageJsonFilename, dependencyStructure, force = false) {
    const packageJsonFile = node_fs_1.default.readFileSync(packageJsonFilename, 'utf-8').toString();
    const packageJson = JSON.parse(packageJsonFile);
    if (!packageJson.name)
        throw Error('Package does not have a name');
    if (dependencyStructure[packageJson.name])
        return dependencyStructure;
    const dependencies = [
        ...new Set([
            ...Object.keys(packageJson.dependencies ?? {}),
            ...Object.keys(packageJson.devDependencies ?? {}),
            // ...Object.keys(packageJson.peerDependencies ?? {}),
        ].filter((name) => name.includes('graphcommerce'))),
    ];
    if (!force && !packageJson.name.includes('graphcommerce'))
        return dependencyStructure;
    dependencyStructure[packageJson.name] = {
        dirName: node_path_1.default.dirname(node_path_1.default.relative(process.cwd(), packageJsonFilename)),
        dependencies,
    };
    dependencies.forEach((dependency) => {
        resolveRecursivePackageJson(require.resolve(node_path_1.default.join(dependency, 'package.json')), dependencyStructure);
    });
    return dependencyStructure;
}
/**
 * We're sorting all dependencies topologically
 *
 * This can detect dependency cycles and throw an error
 */
function sortDependencies(dependencyStructure) {
    const packages = Object.entries(dependencyStructure);
    const sorter = new PackagesSort_1.PackagesSort(new Map(packages.map(([key, value]) => [key, value.dirName])));
    packages.forEach(([key, { dependencies }]) => dependencies.forEach((dependency) => sorter.addEdge(key, dependency)));
    const sortedKeys = [...sorter.sort().keys()];
    return new Map(sortedKeys.map((key) => [key, dependencyStructure[key].dirName]));
}
exports.sortDependencies = sortDependencies;
/**
 * This will return a list of all dependencies that have `graphcommerce` in the name, matching:
 *
 * - `@graphcommerce/package-name`
 * - `@mycompany/graphcommerce-my-feature`
 *
 * It will traverse children until it finds a package that doesn't contain graphcommerce in the name
 * and stop there, not checking children.
 */
function resolveDependenciesSync(root = process.cwd()) {
    const cached = resolveCache.get(root);
    if (cached)
        return cached;
    const dependencyStructure = resolveRecursivePackageJson(node_path_1.default.join(root, 'package.json'), {}, true);
    const sorted = sortDependencies(dependencyStructure);
    resolveCache.set(root, sorted);
    return sorted;
}
exports.resolveDependenciesSync = resolveDependenciesSync;
