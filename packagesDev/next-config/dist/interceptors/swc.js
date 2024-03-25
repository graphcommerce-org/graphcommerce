"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSync = exports.parseSync = void 0;
const core_1 = require("@swc/core");
function parseSync(src) {
    return (0, core_1.parseSync)(src, {
        syntax: 'typescript',
        tsx: true,
        comments: true,
    });
}
exports.parseSync = parseSync;
function printSync(m) {
    return (0, core_1.printSync)(m);
}
exports.printSync = printSync;
