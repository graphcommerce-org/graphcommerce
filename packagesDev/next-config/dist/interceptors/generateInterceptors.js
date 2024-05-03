"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInterceptors = void 0;
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("node:fs/promises"));
const findOriginalSource_1 = require("./findOriginalSource");
const generateInterceptor_1 = require("./generateInterceptor");
async function generateInterceptors(plugins, resolve, config, force) {
    const byTargetModuleAndExport = (0, generateInterceptor_1.moveRelativeDown)(plugins).reduce((acc, plug) => {
        let { sourceModule: pluginPath } = plug;
        if (!(0, generateInterceptor_1.isPluginConfig)(plug) || !plug.enabled)
            return acc;
        const result = resolve(plug.targetModule, { includeSources: true });
        const { error, resolved } = (0, findOriginalSource_1.findOriginalSource)(plug, result, resolve);
        if (error) {
            console.log(error.message);
            return acc;
        }
        const { fromRoot } = resolved;
        if (pluginPath.startsWith('.')) {
            const resolvedPlugin = resolve(pluginPath);
            if (resolvedPlugin) {
                pluginPath = node_path_1.default.relative(resolved.fromRoot.split('/').slice(0, -1).join('/'), resolvedPlugin.fromRoot);
            }
        }
        if (!acc[resolved.fromRoot]) {
            acc[resolved.fromRoot] = {
                ...resolved,
                target: `${resolved.fromRoot}.interceptor`,
                targetExports: {},
            };
        }
        if (!acc[fromRoot].targetExports[plug.targetExport])
            acc[fromRoot].targetExports[plug.targetExport] = [];
        acc[fromRoot].targetExports[plug.targetExport].push({ ...plug, sourceModule: pluginPath });
        return acc;
    }, {});
    return Object.fromEntries(await Promise.all(Object.entries(byTargetModuleAndExport).map(async ([target, interceptor]) => {
        const file = `${interceptor.fromRoot}.interceptor.tsx`;
        const originalSource = !force &&
            (await promises_1.default
                .access(file, promises_1.default.constants.F_OK)
                .then(() => true)
                .catch(() => false))
            ? (await promises_1.default.readFile(file)).toString()
            : undefined;
        return [
            target,
            await (0, generateInterceptor_1.generateInterceptor)(interceptor, config ?? {}, originalSource),
        ];
    })));
}
exports.generateInterceptors = generateInterceptors;
