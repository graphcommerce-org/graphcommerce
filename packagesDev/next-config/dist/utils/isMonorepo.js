"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findParentPath = findParentPath;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const debug = process.env.DEBUG === '1';
// eslint-disable-next-line no-console
const log = (message) => debug && console.log(`isMonorepo: ${message}`);
function findPackageJson(directory) {
    try {
        const packageJsonPath = node_path_1.default.join(directory, 'package.json');
        const content = node_fs_1.default.readFileSync(packageJsonPath, 'utf8');
        return JSON.parse(content);
    }
    catch {
        return null;
    }
}
/**
 * Finds the path of the parent @graphcommerce package if it exists Returns null if no parent
 * package is found
 */
function findParentPath(directory) {
    let currentDir = directory;
    log(`Starting directory: ${currentDir}`);
    // Start from the parent directory
    currentDir = node_path_1.default.dirname(currentDir);
    log(`Looking for parent packages starting from: ${currentDir}`);
    // Keep going up until we find a root package or hit the filesystem root
    while (currentDir !== node_path_1.default.parse(currentDir).root) {
        const packageJson = findPackageJson(currentDir);
        if (packageJson) {
            log(`Found package.json in: ${currentDir}`);
            log(`Package name: ${packageJson.name}`);
            if (packageJson.name.startsWith('@graphcommerce/')) {
                log(`Found parent @graphcommerce package at: ${currentDir}`);
                return currentDir;
            }
        }
        currentDir = node_path_1.default.dirname(currentDir);
    }
    log('No parent @graphcommerce package found');
    return null;
}
