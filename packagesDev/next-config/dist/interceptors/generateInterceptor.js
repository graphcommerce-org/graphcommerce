"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInterceptor = exports.moveRelativeDown = exports.SOURCE_END = exports.SOURCE_START = exports.isPluginConfig = exports.isReplacePluginConfig = exports.isMethodPluginConfig = exports.isReactPluginConfig = exports.isPluginBaseConfig = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const prettier_config_pwa_1 = __importDefault(require("@graphcommerce/prettier-config-pwa"));
// eslint-disable-next-line import/no-extraneous-dependencies
const prettier_1 = __importDefault(require("prettier"));
const removeExports_1 = require("./removeExports");
const swc_1 = require("./swc");
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
exports.SOURCE_START = '/** ❗️ Original (modified) source starts here **/';
exports.SOURCE_END = '/** ❗️ Original (modified) source ends here **/';
const originalSuffix = 'Original';
const sourceSuffix = 'Source';
const interceptorSuffix = 'Interceptor';
const disabledSuffix = 'Disabled';
const name = (plugin) => plugin.sourceExport === 'plugin' || plugin.sourceExport === 'Plugin'
    ? plugin.sourceModule.split('/')[plugin.sourceModule.split('/').length - 1]
    : plugin.sourceExport;
const originalName = (n) => `${n}${originalSuffix}`;
const sourceName = (n) => `${n}${sourceSuffix}`;
const interceptorName = (n) => `${n}${interceptorSuffix}`;
function moveRelativeDown(plugins) {
    return [...plugins].sort((a, b) => {
        if (a.sourceModule.startsWith('.') && !b.sourceModule.startsWith('.'))
            return 1;
        if (!a.sourceModule.startsWith('.') && b.sourceModule.startsWith('.'))
            return -1;
        return 0;
    });
}
exports.moveRelativeDown = moveRelativeDown;
async function generateInterceptorBase(interceptor, config) {
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
    const ast = (0, swc_1.parseSync)(source);
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
                result = `const ${interceptorName(name(p))} = (props: DistributedOmit<Parameters<typeof ${sourceName(name(p))}>[0], 'Prev'>) => ${body}`;
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
    const template = `/* eslint-disable */
      /* This file is automatically generated for ${dependency} */
      ${Object.values(targetExports).some((t) => t.some((p) => p.type === 'component'))
        ? `import type { DistributedOmit } from 'type-fest'`
        : ''}

${pluginImports}

${exports.SOURCE_START}
${(0, swc_1.printSync)(ast).code}
${exports.SOURCE_END}
${logOnce}${pluginExports}
`;
    const templateFormatted = await prettier_1.default.format(template, {
        ...prettier_config_pwa_1.default,
        parser: 'typescript',
    });
    return { ...interceptor, template: templateFormatted };
}
// export function memoize1of3<F extends (a2: any, a3: any) => any>(fn: F): F {
//   const memoize1cache: WeakMap<
//     Record<string, any>,
//     WeakMap<Record<string, any>, any>
//   > = new WeakMap()
//   return function memoized(key: any, a2: any, a3: any): any {
//     const cachedValue = memoize1cache.get(a1)
//     if (cachedValue === undefined) {
//       const newValue = fn(a2, a3)
//       console.log({ a1 })
//       if (a1 && newValue) memoize1cache.set(a1, newValue)
//       return newValue
//     }
//     console.log('using cached value')
//     return cachedValue
//   } as F
// }
// const memoizedGenerateInterceptor = memoize1of3(generateInterceptorBase)
exports.generateInterceptor = generateInterceptorBase;
