"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codegenInterceptors = void 0;
const loadConfig_1 = require("../../config/loadConfig");
const resolveDependency_1 = require("../../utils/resolveDependency");
const findPlugins_1 = require("../findPlugins");
const generateInterceptors_1 = require("../generateInterceptors");
const writeInterceptors_1 = require("../writeInterceptors");
// eslint-disable-next-line @typescript-eslint/require-await
async function codegenInterceptors() {
    const conf = (0, loadConfig_1.loadConfig)(process.cwd());
    const [plugins, errors] = (0, findPlugins_1.findPlugins)(conf);
    const generatedInterceptors = await (0, generateInterceptors_1.generateInterceptors)(plugins, (0, resolveDependency_1.resolveDependency)(), conf.debug, true);
    // const generated = Date.now()
    // console.log('Generated interceptors in', generated - found, 'ms')
    await (0, writeInterceptors_1.writeInterceptors)(generatedInterceptors);
}
exports.codegenInterceptors = codegenInterceptors;
