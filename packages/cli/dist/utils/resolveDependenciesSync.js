"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDependenciesSync = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
function resolveRecursivePackageJson(packageJsonFilename, packageNames) {
    try {
        const packageJsonFile = node_fs_1.default.readFileSync(packageJsonFilename, 'utf-8').toString();
        const packageJson = JSON.parse(packageJsonFile);
        if (!packageJson.name)
            throw Error('Package does not have a name');
        const dependencies = [
            ...Object.keys(packageJson.dependencies ?? {}),
            ...Object.keys(packageJson.devDependencies ?? {}),
            ...Object.keys(packageJson.peerDependencies ?? {}),
        ];
        const isGraphCommerce = !!dependencies.some((name) => name.includes('graphcommerce'));
        if (!isGraphCommerce)
            return packageNames;
        const dirName = node_path_1.default.dirname(node_path_1.default.relative(process.cwd(), packageJsonFilename));
        if (packageNames.has(packageJson.name))
            return packageNames;
        // Package not found, recursively scan
        packageNames.set(packageJson.name, dirName);
        dependencies.map((dependency) => {
            try {
                const filePath = require.resolve(node_path_1.default.join(dependency, 'package.json'));
                if (filePath)
                    return resolveRecursivePackageJson(filePath, packageNames);
            }
            catch {
                return false;
            }
            return false;
        });
    }
    catch (e) {
        // File is not a JSON file or something like that, we now skip this file
    }
    return packageNames;
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
    return resolveRecursivePackageJson(node_path_1.default.join(root, 'package.json'), new Map());
}
exports.resolveDependenciesSync = resolveDependenciesSync;
