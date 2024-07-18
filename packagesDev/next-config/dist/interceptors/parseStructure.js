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
    ifConfig: zod_1.z.union([zod_1.z.string(), zod_1.z.tuple([zod_1.z.string(), zod_1.z.unknown()])]).optional(),
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
    const pluginConfigs = exportVals
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
            return null;
        }
        const parsed = pluginConfigParsed.safeParse(config);
        if (!parsed.success) {
            if (errors.length)
                console.error(parsed.error.errors.map((e) => `${e.path} ${e.message}`).join('\n'));
            return undefined;
        }
        let enabled = true;
        if (parsed.data.ifConfig) {
            if (Array.isArray(parsed.data.ifConfig)) {
                const isBoolean = typeof parsed.data.ifConfig[1] === 'boolean';
                let confValue = (0, get_1.default)(gcConfig, parsed.data.ifConfig[0]);
                confValue = isBoolean ? Boolean(confValue) : confValue;
                enabled = confValue === parsed.data.ifConfig[1];
            }
            else {
                enabled = Boolean((0, get_1.default)(gcConfig, parsed.data.ifConfig));
            }
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
    const newPluginConfigs = pluginConfigs.reduce((acc, pluginConfig) => {
        if (!acc.find((accPluginConfig) => accPluginConfig.sourceExport === pluginConfig.sourceExport)) {
            acc.push(pluginConfig);
        }
        return acc;
    }, []);
    return newPluginConfigs;
}
exports.parseStructure = parseStructure;
