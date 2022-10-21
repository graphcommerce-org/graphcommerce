"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmInterceptors = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const glob_1 = __importDefault(require("glob"));
const resolveDependenciesSync_1 = require("../utils/resolveDependenciesSync");
function rmInterceptors(cwd = process.cwd()) {
    const dependencies = (0, resolveDependenciesSync_1.resolveDependenciesSync)(cwd);
    const removed = [];
    dependencies.forEach((dependency) => {
        const files = glob_1.default.sync(`${dependency}/**/*.interceptor.tsx`, { cwd });
        files.forEach((file) => {
            node_fs_1.default.unlinkSync(file);
            removed.push(file);
        });
    });
    return removed;
}
exports.rmInterceptors = rmInterceptors;
