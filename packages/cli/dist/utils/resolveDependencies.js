"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDependencies = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
async function resolveRecursivePackageJson(packageJsonFilename, packageNames) {
    try {
        const packageJsonFile = (await promises_1.default.readFile(packageJsonFilename, 'utf-8')).toString();
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
        if (packageNames.has(dirName))
            return packageNames;
        packageNames.add(dirName);
        await Promise.allSettled(dependencies.map((dependency) => {
            try {
                const filePath = require.resolve(node_path_1.default.join(dependency, 'package.json'));
                if (filePath)
                    return resolveRecursivePackageJson(filePath, packageNames);
            }
            catch {
                return false;
            }
            return false;
        }));
    }
    catch (e) {
        console.log('done', e);
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
async function resolveDependencies(root = process.cwd()) {
    return [...(await resolveRecursivePackageJson(node_path_1.default.join(root, 'package.json'), new Set()))];
}
exports.resolveDependencies = resolveDependencies;
