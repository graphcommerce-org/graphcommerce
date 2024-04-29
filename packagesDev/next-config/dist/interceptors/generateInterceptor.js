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
const RenameVisitor_1 = require("./RenameVisitor");
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
    return plugin.type === 'function';
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
exports.SOURCE_START = '/** Original source starts here (do not modify!): **/';
exports.SOURCE_END = '/** Original source ends here (do not modify!) **/';
const originalSuffix = 'Original';
const sourceSuffix = 'Plugin';
const interceptorSuffix = 'Interceptor';
const disabledSuffix = 'Disabled';
const name = (plugin) => `${plugin.sourceExport}${plugin.sourceModule
    .split('/')[plugin.sourceModule.split('/').length - 1].replace(/[^a-zA-Z0-9]/g, '')}`;
const fileName = (plugin) => `${plugin.sourceModule}#${plugin.sourceExport}`;
const originalName = (n) => `${n}${originalSuffix}`;
const sourceName = (n) => `${n}${sourceSuffix}`;
const interceptorName = (n) => `${n}${interceptorSuffix}`;
const interceptorPropsName = (n) => `${interceptorName(n)}Props`;
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
const generateIdentifyer = (s) => Math.abs(s.split('').reduce((a, b) => {
    // eslint-disable-next-line no-param-reassign, no-bitwise
    a = (a << 5) - a + b.charCodeAt(0);
    // eslint-disable-next-line no-bitwise
    return a & a;
}, 0)).toString();
/**
 * The is on the first line, with the format: \/* hash:${identifer} *\/
 */
function extractIdentifier(source) {
    if (!source)
        return null;
    const match = source.match(/\/\* hash:(\d+) \*\//);
    if (!match)
        return null;
    return match[1];
}
async function generateInterceptor(interceptor, config, oldInterceptorSource) {
    const identifer = generateIdentifyer(JSON.stringify(interceptor) + JSON.stringify(config));
    const { dependency, targetExports, source } = interceptor;
    if (oldInterceptorSource && identifer === extractIdentifier(oldInterceptorSource))
        return { ...interceptor, template: oldInterceptorSource };
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
    new RenameVisitor_1.RenameVisitor(Object.keys(targetExports), (s) => originalName(s)).visitModule(ast);
    const pluginExports = Object.entries(targetExports)
        .map(([base, plugins]) => {
        const duplicateInterceptors = new Set();
        let carry = originalName(base);
        const carryProps = [];
        const pluginSee = [];
        pluginSee.push(`@see {@link file://${interceptor.sourcePathRelative}} for original source file`);
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
            const wrapChain = plugins
                .reverse()
                .map((pl) => name(pl))
                .join(' wrapping ');
            if (isReplacePluginConfig(p)) {
                new RenameVisitor_1.RenameVisitor([originalName(p.targetExport)], (s) => s.replace(originalSuffix, disabledSuffix)).visitModule(ast);
                carryProps.push(interceptorPropsName(name(p)));
                result = `type ${interceptorPropsName(name(p))} = React.ComponentProps<typeof ${sourceName(name(p))}>`;
                pluginSee.push(`@see {${sourceName(name(p))}} for replacement of the original source (original source not used)`);
            }
            if (isReactPluginConfig(p)) {
                carryProps.push(interceptorPropsName(name(p)));
                result = `
              type ${interceptorPropsName(name(p))} = DistributedOmitForPlugins<React.ComponentProps<typeof ${sourceName(name(p))}>, 'Prev'>
              const ${interceptorName(name(p))} = (props: ${carryProps.join(' & ')}) => {
                ${config.pluginStatus ? `logOnce(\`🔌 Rendering ${base} with plugin(s): ${wrapChain} wrapping <${base}/>\`)` : ''}

                ${process.env.NODE_ENV === 'development'
                    ? `if(!props['data-plugin'])
                  logOnce('${fileName(p)} does not spread props to prev: <Prev {...props}/>. This will cause issues if multiple plugins are applied to this component.')`
                    : ''}
                return <${sourceName(name(p))} {...props} Prev={${carry} as React.FC} />
              }`;
                pluginSee.push(`@see {${sourceName(name(p))}} for source of applied plugin`);
            }
            if (isMethodPluginConfig(p)) {
                result = `const ${interceptorName(name(p))}: typeof ${carry} = (...args) => {
                ${config.pluginStatus ? `logOnce(\`🔌 Calling ${base} with plugin(s): ${wrapChain} wrapping ${base}()\`)` : ''}
                return ${sourceName(name(p))}(${carry}, ...args)
              }`;
                pluginSee.push(`@see {${sourceName(name(p))}} for source of applied plugin`);
            }
            carry = p.type === 'replace' ? sourceName(name(p)) : interceptorName(name(p));
            return result;
        })
            .filter((v) => !!v)
            .join('\n');
        const isComponent = plugins.every((p) => isReplacePluginConfig(p) || isReactPluginConfig(p));
        if (isComponent && plugins.some((p) => isMethodPluginConfig(p))) {
            throw new Error(`Cannot mix React and Method plugins for ${base} in ${dependency}.`);
        }
        const seeString = `
      /**
       * Interceptor is the generated interceptor for the original.
       *
       * This file is not meant to be modified directly and is auto-generated if the plugins or the original source changes.
       * 
       ${pluginSee.map((s) => `* ${s}`).join('\n')}
       */`;
        if (process.env.NODE_ENV === 'development' && isComponent) {
            return `${pluginStr}
          ${seeString}
          export const ${base}: typeof ${carry} = (props) => {
            return <${carry} {...props} data-plugin />
          }`;
        }
        return `
        ${pluginStr}
        ${seeString}
        export const ${base} = ${carry}
      `;
    })
        .join('\n');
    const logOnce = config.pluginStatus || process.env.NODE_ENV === 'development'
        ? `
        const logged: Set<string> = new Set();
        const logOnce = (log: string, ...additional: unknown[]) => {
          if (logged.has(log)) return
          logged.add(log)
          console.warn(log, ...additional)
        }
        `
        : '';
    const template = `/* hash:${identifer} */
    /* eslint-disable */
    /* This file is automatically generated for ${dependency} */
    ${Object.values(targetExports).some((t) => t.some((p) => p.type === 'component'))
        ? `import type { DistributedOmit as DistributedOmitForPlugins } from 'type-fest'`
        : ''}

    ${pluginImports}

    /** @see {@link file://${interceptor.sourcePathRelative}} for source of original */
    ${exports.SOURCE_START}
    ${(0, swc_1.printSync)(ast).code}
    ${exports.SOURCE_END}
    ${logOnce}${pluginExports}
  `;
    let templateFormatted;
    try {
        templateFormatted = await prettier_1.default.format(template, { ...prettier_config_pwa_1.default, parser: 'typescript' });
    }
    catch (e) {
        console.log('Error formatting interceptor: ', e, 'using raw template.');
        templateFormatted = template;
    }
    return { ...interceptor, template: templateFormatted };
}
exports.generateInterceptor = generateInterceptor;
