"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInterceptors = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
// eslint-disable-next-line import/no-extraneous-dependencies
const glob_1 = __importDefault(require("glob"));
const resolveDependenciesSync_1 = require("../utils/resolveDependenciesSync");
function writeInterceptors(interceptors, cwd = process.cwd()) {
    const dependencies = (0, resolveDependenciesSync_1.resolveDependenciesSync)(cwd);
    const existing = [];
    dependencies.forEach((dependency) => {
        const files = glob_1.default.sync(`${dependency}/**/*.interceptor.tsx`, { cwd });
        existing.push(...files);
    });
    Object.entries(interceptors).forEach(([, plugin]) => {
        const relativeFile = `${plugin.fromRoot}.interceptor.tsx`;
        if (existing.includes(relativeFile)) {
            delete existing[existing.indexOf(relativeFile)];
        }
        if (existing.includes(`./${relativeFile}`)) {
            delete existing[existing.indexOf(`./${relativeFile}`)];
        }
        const fileToWrite = path_1.default.join(cwd, relativeFile);
        const isSame = node_fs_1.default.existsSync(fileToWrite) &&
            node_fs_1.default.readFileSync(fileToWrite, 'utf8').toString() === plugin.template;
        if (!isSame)
            node_fs_1.default.writeFileSync(fileToWrite, plugin.template);
    });
    // Cleanup unused interceptors
    existing.forEach((file) => node_fs_1.default.unlinkSync(file));
}
exports.writeInterceptors = writeInterceptors;
