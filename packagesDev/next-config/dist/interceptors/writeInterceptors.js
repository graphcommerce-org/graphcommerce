"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInterceptors = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
function writeInterceptors(interceptors, cwd = process.cwd()) {
    Object.entries(interceptors).forEach(([target, plugin]) => {
        // eslint-disable-next-line no-console
        const fileToWrite = `${path_1.default.join(cwd, plugin.fromRoot)}.interceptor.tsx`;
        if (!node_fs_1.default.existsSync(fileToWrite) ||
            node_fs_1.default.readFileSync(fileToWrite, 'utf8').toString() !== plugin.template) {
            node_fs_1.default.writeFileSync(fileToWrite, plugin.template);
        }
    });
}
exports.writeInterceptors = writeInterceptors;
