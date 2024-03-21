"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInterceptors = exports.generateInterceptor = exports.SOURCE_END = exports.SOURCE_START = exports.isPluginConfig = exports.isReplacePluginConfig = exports.isMethodPluginConfig = exports.isReactPluginConfig = exports.isPluginBaseConfig = void 0;
const node_path_1 = __importDefault(require("node:path"));
const core_1 = require("@swc/core");
const findOriginalSource_1 = require("./findOriginalSource");
const removeExports_1 = require("./removeExports");
function isPluginBaseConfig(plugin) {
    return (typeof plugin.type === 'string' &&
        typeof plugin.sourceModule === 'string' &&
        typeof plugin.enabled === 'boolean' &&
        typeof plugin.targetExport === 'string');
}
exports.isPluginBaseConfig = isPluginBaseConfig;
function isReactPluginConfig(plugin) {
    if (!isPluginBaseConfig(plugin))
        return false;
    return plugin.type === 'component';
}
exports.isReactPluginConfig = isReactPluginConfig;
function isMethodPluginConfig(plugin) {
    if (!isPluginBaseConfig(plugin))
        return false;
    return plugin.type === 'method';
}
exports.isMethodPluginConfig = isMethodPluginConfig;
function isReplacePluginConfig(plugin) {
    if (!isPluginBaseConfig(plugin))
        return false;
    return plugin.type === 'replace';
}
exports.isReplacePluginConfig = isReplacePluginConfig;
function isPluginConfig(plugin) {
    return isPluginBaseConfig(plugin);
}
exports.isPluginConfig = isPluginConfig;
function moveRelativeDown(plugins) {
    return [...plugins].sort((a, b) => {
        if (a.sourceModule.startsWith('.') && !b.sourceModule.startsWith('.'))
            return 1;
        if (!a.sourceModule.startsWith('.') && b.sourceModule.startsWith('.'))
            return -1;
        return 0;
    });
}
exports.SOURCE_START = '/** ❗️ Original (modified) source starts here **/';
exports.SOURCE_END = '/** ❗️ Original (modified) source ends here **/';
const originalSuffix = '_original';
const sourceSuffix = '_source';
const interceptorSuffix = '_interceptor';
const disabledSuffix = '_DISABLED';
const name = (plugin) => plugin.sourceExport === 'plugin' || plugin.sourceExport === 'Plugin'
    ? plugin.sourceModule.split('/')[plugin.sourceModule.split('/').length - 1]
    : plugin.sourceExport;
const originalName = (n) => `${n}${originalSuffix}`;
const sourceName = (n) => `${n}${sourceSuffix}`;
const interceptorName = (n) => `${n}${interceptorSuffix}`;
function generateInterceptor(interceptor, config) {
    const { dependency, targetExports, source } = interceptor;
    const pluginConfigs = [...Object.entries(targetExports)].map(([, plugins]) => plugins).flat();
    // console.log('pluginConfigs', pluginConfigs)
    const duplicateImports = new Set();
    const pluginImports = moveRelativeDown([...pluginConfigs].sort((a, b) => a.sourceModule.localeCompare(b.sourceModule)))
        .map((plugin) => `import { ${plugin.sourceExport} as ${sourceName(name(plugin))} } from '${plugin.sourceModule}'`)
        .filter((str) => {
        if (duplicateImports.has(str))
            return false;
        duplicateImports.add(str);
        return true;
    })
        .join('\n');
    const ast = (0, core_1.parseSync)(source, { syntax: 'typescript', tsx: true, comments: true });
    new removeExports_1.RenameVisitor(Object.keys(targetExports), (s) => originalName(s)).visitModule(ast);
    const pluginExports = Object.entries(targetExports)
        .map(([base, plugins]) => {
        const duplicateInterceptors = new Set();
        let carry = originalName(base);
        const pluginStr = plugins
            .reverse()
            .filter((p) => {
            if (duplicateInterceptors.has(name(p)))
                return false;
            duplicateInterceptors.add(name(p));
            return true;
        })
            .map((p) => {
            let result;
            if (isReplacePluginConfig(p)) {
                new removeExports_1.RenameVisitor([originalName(p.targetExport)], (s) => s.replace(originalSuffix, disabledSuffix)).visitModule(ast);
            }
            if (isReactPluginConfig(p)) {
                const wrapChain = plugins
                    .reverse()
                    .map((pl) => `<${name(pl)}/>`)
                    .join(' wrapping ');
                const body = config.pluginStatus
                    ? `{
  logInterceptor(\`🔌 Rendering ${base} with plugin(s): ${wrapChain} wrapping <${base}/>\`)
  return <${sourceName(name(p))} {...props} Prev={${carry}} />
}`
                    : `(
  <${sourceName(name(p))} {...props} Prev={${carry}} />
)`;
                result = `const ${interceptorName(name(p))} = (props: InterceptorProps<typeof ${name(p)}>) => ${body}`;
            }
            if (isMethodPluginConfig(p)) {
                const wrapChain = plugins
                    .reverse()
                    .map((pl) => `${name(pl)}()`)
                    .join(' wrapping ');
                const body = config.pluginStatus
                    ? `{
  logInterceptor(
    \`🔌 Calling ${base} with plugin(s): ${wrapChain} wrapping ${base}()\`
  )
  return ${sourceName(name(p))}(${carry}, ...args)
}`
                    : `
${sourceName(name(p))}(${carry}, ...args)`;
                result = `const ${interceptorName(name(p))}: typeof ${carry} = (...args) => ${body}
`;
            }
            carry = p.type === 'replace' ? sourceName(name(p)) : interceptorName(name(p));
            return result;
        })
            .filter((v) => !!v)
            .join('\n');
        const isComponent = plugins.every((p) => isReactPluginConfig(p));
        if (isComponent && plugins.some((p) => isMethodPluginConfig(p))) {
            throw new Error(`Cannot mix React and Method plugins for ${base} in ${dependency}.`);
        }
        return `${pluginStr}

export const ${base} = ${carry}
`;
    })
        .join('\n');
    const logOnce = config.pluginStatus
        ? `
const logged: Set<string> = new Set();
const logInterceptor = (log: string, ...additional: unknown[]) => {
  if (logged.has(log)) return
  logged.add(log)
  console.log(log, ...additional)
}
`
        : '';
    const template = `// eslint-disable
/* This file is automatically generated for ${dependency} */
${Object.values(targetExports).some((t) => t.some((p) => p.type === 'component'))
        ? `import type { InterceptorProps } from '@graphcommerce/next-config'
`
        : ''}
${pluginImports}

${exports.SOURCE_START}
${(0, core_1.printSync)(ast).code}
${exports.SOURCE_END}
${logOnce}${pluginExports}
`;
    return { ...interceptor, template };
}
exports.generateInterceptor = generateInterceptor;
function generateInterceptors(plugins, resolve, config) {
    const byTargetModuleAndExport = moveRelativeDown(plugins).reduce((acc, plug) => {
        let { sourceModule: pluginPath } = plug;
        if (!isPluginConfig(plug) || !plug.enabled)
            return acc;
        const result = resolve(plug.targetModule, { includeSources: true });
        const { error, resolved } = (0, findOriginalSource_1.findOriginalSource)(plug, result, resolve);
        if (error) {
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
    return Object.fromEntries(Object.entries(byTargetModuleAndExport).map(([target, interceptor]) => [
        target,
        generateInterceptor(interceptor, config ?? {}),
    ]));
}
exports.generateInterceptors = generateInterceptors;
