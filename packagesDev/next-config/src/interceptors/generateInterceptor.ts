// eslint-disable-next-line import/no-extraneous-dependencies
import prettierConf from '@graphcommerce/prettier-config-pwa'
// eslint-disable-next-line import/no-extraneous-dependencies
import prettier from 'prettier'
import { GraphCommerceDebugConfig } from '../generated/config'
import { ResolveDependencyReturn } from '../utils/resolveDependency'
import { RenameVisitor } from './removeExports'
import { parseSync, printSync } from './swc'

type PluginBaseConfig = {
  type: 'component' | 'method' | 'replace'
  targetModule: string
  sourceExport: string
  sourceModule: string
  targetExport: string
  enabled: boolean
  ifConfig?: string | [string, string]
}

export function isPluginBaseConfig(plugin: Partial<PluginBaseConfig>): plugin is PluginBaseConfig {
  return (
    typeof plugin.type === 'string' &&
    typeof plugin.sourceModule === 'string' &&
    typeof plugin.enabled === 'boolean' &&
    typeof plugin.targetExport === 'string'
  )
}

type ReactPluginConfig = PluginBaseConfig & { type: 'component' }
type MethodPluginConfig = PluginBaseConfig & { type: 'method' }
type ReplacePluginConfig = PluginBaseConfig & { type: 'replace' }

export function isReactPluginConfig(
  plugin: Partial<PluginBaseConfig>,
): plugin is ReactPluginConfig {
  if (!isPluginBaseConfig(plugin)) return false
  return plugin.type === 'component'
}

export function isMethodPluginConfig(
  plugin: Partial<PluginBaseConfig>,
): plugin is MethodPluginConfig {
  if (!isPluginBaseConfig(plugin)) return false
  return plugin.type === 'method'
}

export function isReplacePluginConfig(
  plugin: Partial<PluginBaseConfig>,
): plugin is ReactPluginConfig {
  if (!isPluginBaseConfig(plugin)) return false
  return plugin.type === 'replace'
}

export type PluginConfig = ReactPluginConfig | MethodPluginConfig | ReplacePluginConfig

export function isPluginConfig(plugin: Partial<PluginConfig>): plugin is PluginConfig {
  return isPluginBaseConfig(plugin)
}

export type Interceptor = ResolveDependencyReturn & {
  targetExports: Record<string, PluginConfig[]>
  target: string
  source: string
  template?: string
}

export type MaterializedPlugin = Interceptor & { template: string }

export const SOURCE_START = '/** ❗️ Original (modified) source starts here **/'
export const SOURCE_END = '/** ❗️ Original (modified) source ends here **/'

const originalSuffix = 'Original'
const sourceSuffix = 'Source'
const interceptorSuffix = 'Interceptor'
const disabledSuffix = 'Disabled'
const name = (plugin: PluginConfig) =>
  plugin.sourceExport === 'plugin' || plugin.sourceExport === 'Plugin'
    ? plugin.sourceModule.split('/')[plugin.sourceModule.split('/').length - 1]
    : plugin.sourceExport
const originalName = (n: string) => `${n}${originalSuffix}`
const sourceName = (n: string) => `${n}${sourceSuffix}`
const interceptorName = (n: string) => `${n}${interceptorSuffix}`

export function moveRelativeDown(plugins: PluginConfig[]) {
  return [...plugins].sort((a, b) => {
    if (a.sourceModule.startsWith('.') && !b.sourceModule.startsWith('.')) return 1
    if (!a.sourceModule.startsWith('.') && b.sourceModule.startsWith('.')) return -1
    return 0
  })
}

const generateIdentifyer = (s: string) =>
  Math.abs(
    s.split('').reduce((a, b) => {
      // eslint-disable-next-line no-param-reassign, no-bitwise
      a = (a << 5) - a + b.charCodeAt(0)
      // eslint-disable-next-line no-bitwise
      return a & a
    }, 0),
  ).toString()

/**
 * The is on the first line, with the format: \/* hash:${identifer} *\/
 */
function extractIdentifier(source: string | undefined) {
  if (!source) return null
  const match = source.match(/\/\* hash:(\d+) \*\//)
  if (!match) return null
  return match[1]
}

export async function generateInterceptor(
  interceptor: Interceptor,
  config: GraphCommerceDebugConfig,
  originalSource?: string,
): Promise<MaterializedPlugin> {
  const identifer = generateIdentifyer(JSON.stringify(interceptor) + JSON.stringify(config))

  const { dependency, targetExports, source } = interceptor

  if (originalSource && identifer === extractIdentifier(originalSource))
    return { ...interceptor, template: originalSource }

  const pluginConfigs = [...Object.entries(targetExports)].map(([, plugins]) => plugins).flat()

  // console.log('pluginConfigs', pluginConfigs)
  const duplicateImports = new Set()

  const pluginImports = moveRelativeDown(
    [...pluginConfigs].sort((a, b) => a.sourceModule.localeCompare(b.sourceModule)),
  )
    .map(
      (plugin) =>
        `import { ${plugin.sourceExport} as ${sourceName(name(plugin))} } from '${plugin.sourceModule}'`,
    )
    .filter((str) => {
      if (duplicateImports.has(str)) return false
      duplicateImports.add(str)
      return true
    })
    .join('\n')

  const ast = parseSync(source)

  new RenameVisitor(Object.keys(targetExports), (s) => originalName(s)).visitModule(ast)

  const pluginExports = Object.entries(targetExports)
    .map(([base, plugins]) => {
      const duplicateInterceptors = new Set()

      let carry = originalName(base)

      const pluginStr = plugins
        .reverse()
        .filter((p: PluginConfig) => {
          if (duplicateInterceptors.has(name(p))) return false
          duplicateInterceptors.add(name(p))
          return true
        })
        .map((p) => {
          let result

          if (isReplacePluginConfig(p)) {
            new RenameVisitor([originalName(p.targetExport)], (s) =>
              s.replace(originalSuffix, disabledSuffix),
            ).visitModule(ast)
          }

          if (isReactPluginConfig(p)) {
            const wrapChain = plugins
              .reverse()
              .map((pl) => `<${name(pl)}/>`)
              .join(' wrapping ')

            const body = config.pluginStatus
              ? `{
                   logInterceptor(\`🔌 Rendering ${base} with plugin(s): ${wrapChain} wrapping <${base}/>\`)
                   return <${sourceName(name(p))} {...props} Prev={${carry}} />
                 }`
              : `<${sourceName(name(p))} {...props} Prev={${carry}} />`

            result = `const ${interceptorName(name(p))} = (props: DistributedOmit<Parameters<typeof ${sourceName(name(p))}>[0], 'Prev'>) => ${body}`
          }

          if (isMethodPluginConfig(p)) {
            const wrapChain = plugins
              .reverse()
              .map((pl) => `${name(pl)}()`)
              .join(' wrapping ')

            const body = config.pluginStatus
              ? `{
                   logInterceptor(\`🔌 Calling ${base} with plugin(s): ${wrapChain} wrapping ${base}()\`)
                   return ${sourceName(name(p))}(${carry}, ...args)
                 }`
              : `${sourceName(name(p))}(${carry}, ...args)`

            result = `const ${interceptorName(name(p))}: typeof ${carry} = (...args) => ${body}`
          }

          carry = p.type === 'replace' ? sourceName(name(p)) : interceptorName(name(p))
          return result
        })
        .filter((v) => !!v)
        .join('\n')

      const isComponent = plugins.every((p) => isReactPluginConfig(p))
      if (isComponent && plugins.some((p) => isMethodPluginConfig(p))) {
        throw new Error(`Cannot mix React and Method plugins for ${base} in ${dependency}.`)
      }

      return `${pluginStr}
        export const ${base} = ${carry}
        `
    })
    .join('\n')

  const logOnce = config.pluginStatus
    ? `
        const logged: Set<string> = new Set();
        const logInterceptor = (log: string, ...additional: unknown[]) => {
          if (logged.has(log)) return
          logged.add(log)
          console.log(log, ...additional)
        }
        `
    : ''

  const template = `/* hash:${identifer} */
  /* eslint-disable */
      /* This file is automatically generated for ${dependency} */
      ${
        Object.values(targetExports).some((t) => t.some((p) => p.type === 'component'))
          ? `import type { DistributedOmit } from 'type-fest'`
          : ''
      }

      ${pluginImports}

      ${SOURCE_START}
      ${printSync(ast).code}
      ${SOURCE_END}
      ${logOnce}${pluginExports}
`

  const templateFormatted = await prettier.format(template, {
    ...prettierConf,
    parser: 'typescript',
  })

  return { ...interceptor, template: templateFormatted }
}
