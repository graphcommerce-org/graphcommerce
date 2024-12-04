"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportConfig = exportConfig;
const dotenv_1 = __importDefault(require("dotenv"));
const loadConfig_1 = require("../loadConfig");
const exportConfigToEnv_1 = require("../utils/exportConfigToEnv");
dotenv_1.default.config();
// eslint-disable-next-line @typescript-eslint/require-await
async function exportConfig() {
    const conf = (0, loadConfig_1.loadConfig)(process.cwd());
    // eslint-disable-next-line no-console
    console.log((0, exportConfigToEnv_1.exportConfigToEnv)(conf));
}
