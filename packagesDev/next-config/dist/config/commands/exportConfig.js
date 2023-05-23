"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportConfig = void 0;
const loadConfig_js_1 = require("../loadConfig.js");
const exportConfigToEnv_js_1 = require("../utils/exportConfigToEnv.js");
// eslint-disable-next-line @typescript-eslint/require-await
async function exportConfig() {
    const conf = (0, loadConfig_js_1.loadConfig)(process.cwd());
    console.log((0, exportConfigToEnv_js_1.exportConfigToEnv)(conf));
}
exports.exportConfig = exportConfig;
