"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStructure = void 0;
const get_1 = __importDefault(require("lodash/get"));
const zod_1 = require("zod");
const extractExports_1 = require("./extractExports");
const pluginConfigParsed = zod_1.z.object({
    type: zod_1.z.enum(['component', 'function', 'replace']),
    module: zod_1.z.string(),
    export: zod_1.z.string(),
    ifConfig: zod_1.z.union([zod_1.z.string(), zod_1.z.tuple([zod_1.z.string(), zod_1.z.string()])]).optional(),
});
function nonNullable(value) {
    return value !== null && value !== undefined;
}
const isObject = (input) => typeof input === 'object' && input !== null && !Array.isArray(input);
function parseStructure(ast, gcConfig, sourceModule) {
    const [exports, errors] = (0, extractExports_1.extractExports)(ast);
    if (errors.length)
        console.error(`Plugin error for`, errors.join('\n'));
    const { config: moduleConfig, component, func, exported, ifConfig, plugin, Plugin, ...rest } = exports;
    const exportVals = Object.keys(rest);
    if (component && !moduleConfig)
        exportVals.push('Plugin');
    if (func && !moduleConfig)
        exportVals.push('plugin');
    return exportVals
        .map((exportVal) => {
        let config = isObject(moduleConfig) ? moduleConfig : {};
        if (!moduleConfig && component) {
            config = { type: 'component', module: exported, ifConfig, export: 'Plugin' };
        }
        else if (!moduleConfig && func) {
            config = { type: 'function', module: exported, ifConfig, export: 'plugin' };
        }
        else if (isObject(moduleConfig)) {
            config = { ...moduleConfig, export: exportVal };
        }
        else {
            console.error(`Plugin configuration invalid! See ${sourceModule}`);
        }
        const parsed = pluginConfigParsed.safeParse(config);
        if (!parsed.success) {
            if (errors.length)
                console.error(parsed.error.errors.map((e) => `${e.path} ${e.message}`).join('\n'));
            return undefined;
        }
        let enabled = true;
        if (parsed.data.ifConfig) {
            enabled = Array.isArray(parsed.data.ifConfig)
                ? (0, get_1.default)(gcConfig, parsed.data.ifConfig[0]) === parsed.data.ifConfig[1]
                : Boolean((0, get_1.default)(gcConfig, parsed.data.ifConfig));
        }
        const val = {
            targetExport: exports.component || exports.func || parsed.data.export,
            sourceModule,
            sourceExport: parsed.data.export,
            targetModule: parsed.data.module,
            type: parsed.data.type,
            enabled,
        };
        if (parsed.data.ifConfig)
            val.ifConfig = parsed.data.ifConfig;
        return val;
    })
        .filter(nonNullable);
}
exports.parseStructure = parseStructure;
