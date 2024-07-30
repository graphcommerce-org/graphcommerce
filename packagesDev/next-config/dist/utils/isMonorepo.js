"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMonorepo = isMonorepo;
const node_path_1 = __importDefault(require("node:path"));
function isMonorepo() {
    const root = process.cwd();
    const meshDir = node_path_1.default.dirname(require.resolve('@graphcommerce/graphql-mesh'));
    const relativePath = node_path_1.default.join(node_path_1.default.relative(meshDir, root), '/');
    return relativePath.startsWith(`..${node_path_1.default.sep}..${node_path_1.default.sep}examples`);
}
