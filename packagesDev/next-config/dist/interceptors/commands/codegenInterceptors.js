"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegenInterceptors = codegenInterceptors;
const dotenv_1 = __importDefault(require("dotenv"));
const loadConfig_1 = require("../../config/loadConfig");
const resolveDependency_1 = require("../../utils/resolveDependency");
const findPlugins_1 = require("../findPlugins");
const generateInterceptors_1 = require("../generateInterceptors");
const writeInterceptors_1 = require("../writeInterceptors");
dotenv_1.default.config();
// eslint-disable-next-line @typescript-eslint/require-await
async function codegenInterceptors() {
    const conf = (0, loadConfig_1.loadConfig)(process.cwd());
    const [plugins] = (0, findPlugins_1.findPlugins)(conf);
    const generatedInterceptors = await (0, generateInterceptors_1.generateInterceptors)(plugins, (0, resolveDependency_1.resolveDependency)(), conf.debug, true);
    // const generated = Date.now()
    // console.log('Generated interceptors in', generated - found, 'ms')
    await (0, writeInterceptors_1.writeInterceptors)(generatedInterceptors);
}
