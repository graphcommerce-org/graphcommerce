"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportConfig = void 0;
const loadConfig_1 = require("../loadConfig");
const exportConfigToEnv_1 = require("../utils/exportConfigToEnv");
// eslint-disable-next-line @typescript-eslint/require-await
async function exportConfig() {
    const conf = (0, loadConfig_1.loadConfig)(process.cwd());
    // eslint-disable-next-line no-console
    console.log((0, exportConfigToEnv_1.exportConfigToEnv)(conf));
}
exports.exportConfig = exportConfig;
