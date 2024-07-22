"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSync = parseSync;
exports.printSync = printSync;
const core_1 = require("@swc/core");
function parseSync(src) {
    return (0, core_1.parseSync)(src, {
        syntax: 'typescript',
        tsx: true,
        comments: true,
    });
}
function printSync(m) {
    return (0, core_1.printSync)(m);
}
