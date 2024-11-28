"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMonorepo = isMonorepo;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const debug = process.env.DEBUG === '1';
// eslint-disable-next-line no-console
const log = (message) => debug && console.log(`is-monorepo: ${message}`);
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
function isMonorepo() {
    let currentDir = process.cwd();
    log(`Starting directory: ${currentDir}`);
    // Keep going up until we find a root package or hit the filesystem root
    while (currentDir !== node_path_1.default.parse(currentDir).root) {
        const packageJson = findPackageJson(currentDir);
        if (packageJson) {
            log(`Found package.json in: ${currentDir}`);
            log(`Package name: ${packageJson.name}`);
            // If we find a root package, we're in a monorepo
            if (packageJson.name === '@graphcommerce/private' ||
                packageJson.name === '@graphcommerce/graphcommerce') {
                log('isMonorepo result: true');
                return true;
            }
        }
        // Go up one directory
        currentDir = node_path_1.default.dirname(currentDir);
    }
    log('isMonorepo result: false');
    return false;
}
