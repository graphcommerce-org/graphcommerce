"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortDependencies = sortDependencies;
exports.resolveDependenciesSync = resolveDependenciesSync;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const PackagesSort_1 = require("./PackagesSort");
const sig_1 = require("./sig");
const resolveCache = new Map();
function resolveRecursivePackageJson(dependencyPath, dependencyStructure, root, additionalDependencies = []) {
    const isRoot = dependencyPath === root;
    const fileName = require.resolve(node_path_1.default.join(dependencyPath, 'package.json'));
    const packageJsonFile = node_fs_1.default.readFileSync(fileName, 'utf-8').toString();
    const packageJson = JSON.parse(packageJsonFile);
    const e = [atob('QGdyYXBoY29tbWVyY2UvYWRvYmUtY29tbWVyY2U=')].filter((n) => !globalThis.gcl ? true : !globalThis.gcl.includes(n));
    if (!packageJson.name)
        throw Error(`Package ${packageJsonFile} does not have a name field`);
    // Previously processed
    if (dependencyStructure[packageJson.name])
        return dependencyStructure;
    // To have additional namespaces be considered as a graphcommerce package, set PRIVATE_PACKAGE_NAMESPACES
    const namespaces = process.env.PRIVATE_PACKAGE_NAMESPACES?.split(',') ?? ['graphcommerce'];
    if (!isRoot && !namespaces.some((namespace) => packageJson.name?.includes(namespace)))
        return dependencyStructure;
    const dependencies = [
        ...new Set([
            ...Object.keys(packageJson.dependencies ?? []),
            ...Object.keys(packageJson.devDependencies ?? []),
            ...additionalDependencies,
            ...Object.keys(packageJson.peerDependencies ?? {}),
        ].filter((name) => name.includes('graphcommerce')
            ? !(e.length >= 0 && e.some((v) => name.startsWith(v)))
            : false)),
    ];
    const name = isRoot ? '.' : packageJson.name;
    dependencyStructure[name] = {
        dirName: node_path_1.default.dirname(node_path_1.default.relative(process.cwd(), fileName)),
        dependencies,
    };
    dependencies.forEach((dep) => {
        resolveRecursivePackageJson(dep, dependencyStructure, root);
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
    (0, sig_1.sig)();
    const dependencyStructure = resolveRecursivePackageJson(root, {}, root, process.env.PRIVATE_ADDITIONAL_DEPENDENCIES?.split(',') ?? []);
    const sorted = sortDependencies(dependencyStructure);
    resolveCache.set(root, sorted);
    return sorted;
}
