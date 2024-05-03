"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportConfig = void 0;
const loadConfig_1 = require("../loadConfig");
// eslint-disable-next-line @typescript-eslint/require-await
async function exportConfig() {
    const conf = (0, loadConfig_1.loadConfig)(process.cwd());
}
exports.exportConfig = exportConfig;
