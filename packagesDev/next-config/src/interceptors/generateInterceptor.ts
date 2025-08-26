import prettierConf from '@graphcommerce/prettier-config-pwa'
import prettier from 'prettier'
import type { GraphCommerceDebugConfig } from '../generated/config'
import type { ResolveDependencyReturn } from '../utils/resolveDependency'

type PluginBaseConfig = {
  type: 'component' | 'function' | 'replace'
  targetModule: string
  sourceExport: string
  sourceModule: string
  targetExport: string
  enabled: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ifConfig?: string | [string, any]
}

/** @public */
export function isPluginBaseConfig(plugin: Partial<PluginBaseConfig>): plugin is PluginBaseConfig {
  return (
    typeof plugin.type === 'string' &&
    typeof plugin.sourceModule === 'string' &&
    typeof plugin.enabled === 'boolean' &&
    typeof plugin.targetExport === 'string'
  )
}

type ReactPluginConfig = PluginBaseConfig & { type: 'component' }
type MethodPluginConfig = PluginBaseConfig & { type: 'function' }
type ReplacePluginConfig = PluginBaseConfig & { type: 'replace' }

/** @public */
export function isReactPluginConfig(
  plugin: Partial<PluginBaseConfig>,
): plugin is ReactPluginConfig {
  if (!isPluginBaseConfig(plugin)) return false
  return plugin.type === 'component'
}

/** @public */
export function isMethodPluginConfig(
  plugin: Partial<PluginBaseConfig>,
): plugin is MethodPluginConfig {
  if (!isPluginBaseConfig(plugin)) return false
  return plugin.type === 'function'
}

/** @public */
export function isReplacePluginConfig(
  plugin: Partial<PluginBaseConfig>,
): plugin is ReplacePluginConfig {
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
}

export type MaterializedPlugin = Interceptor & {
  template: string
}

export function moveRelativeDown(plugins: PluginConfig[]) {
  return [...plugins].sort((a, b) => {
    if (a.sourceModule.startsWith('.') && !b.sourceModule.startsWith('.')) return 1
    if (!a.sourceModule.startsWith('.') && b.sourceModule.startsWith('.')) return -1
    return 0
  })
}

const originalSuffix = 'Original'
const interceptorSuffix = 'Interceptor'
const disabledSuffix = 'Disabled'
const name = (plugin: PluginConfig) =>
  `${plugin.sourceExport}${plugin.sourceModule
    .split('/')
    [plugin.sourceModule.split('/').length - 1].replace(/[^a-zA-Z0-9]/g, '')}`

const fileName = (plugin: PluginConfig) => `${plugin.sourceModule}#${plugin.sourceExport}`

const originalName = (n: string) => `${n}${originalSuffix}`
const sourceName = (n: string) => `${n}`
const interceptorName = (n: string) => `${n}${interceptorSuffix}`
const interceptorPropsName = (n: string) => `${n}Props`

const generateIdentifyer = (s: string) =>
  Math.abs(
    s.split('').reduce((a, b) => {
      const value = ((a << 5) - a + b.charCodeAt(0)) & 0xffffffff
      return value < 0 ? value * -2 : value
    }, 0),
  ).toString()

/**
 * Extract the identifier from the first line of the source file. The identifier is in the format:
 * slash-star hash:${identifer} star-slash
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
  oldInterceptorSource?: string,
): Promise<MaterializedPlugin> {
  const identifer = generateIdentifyer(JSON.stringify(interceptor) + JSON.stringify(config))

  const { dependency, targetExports } = interceptor

  if (oldInterceptorSource && identifer === extractIdentifier(oldInterceptorSource))
    return { ...interceptor, template: oldInterceptorSource }

  const pluginConfigs = [...Object.entries(targetExports)].map(([, plugins]) => plugins).flat()

  // Generate plugin imports
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
    .join('\n    ')

  // Generate imports for original components
  const originalImports = [...Object.entries(targetExports)]
    .map(([targetExport]) => {
      const extension = interceptor.sourcePath.endsWith('.tsx') ? '.tsx' : '.ts'
      const importPath = `./${interceptor.target.split('/').pop()}.original`
      return `import { ${targetExport} as ${targetExport}${originalSuffix} } from '${importPath}'`
    })
    .join('\n    ')

  let logOnce = ''
  // Note: logInterceptors config option removed for now
  // if (config.logInterceptors)
  //   logOnce = `
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('🚦 Intercepted ${dependency}')
  // }
  // `

  // Generate the plugin chain for each target export
  const pluginExports = [...Object.entries(targetExports)]
    .map(([targetExport, plugins]) => {
      if (plugins.some((p) => p.type === 'component')) {
        // Component plugins
        const componentPlugins = plugins.filter((p) => p.type === 'component')
        const pluginChain = componentPlugins
          .map((plugin) => `${sourceName(name(plugin))}`)
          .reverse()
          .reduce((acc, pluginName, index) => {
            if (index === 0) {
              return `${pluginName}({ ...props, Prev: ${targetExport}${originalSuffix} })`
            }
            return `${pluginName}({ ...props, Prev: (props) => ${acc} })`
          }, `${targetExport}${originalSuffix}(props)`)

        return `export function ${targetExport}(props: any) {
    return ${pluginChain}
  }`
      } else if (plugins.some((p) => p.type === 'function')) {
        // Function plugins
        const functionPlugins = plugins.filter((p) => p.type === 'function')
        const pluginChain = functionPlugins
          .map((plugin) => `${sourceName(name(plugin))}`)
          .reduce((acc, pluginName) => {
            return `${pluginName}(${acc})`
          }, `${targetExport}${originalSuffix}`)

        return `const ${targetExport}Interceptor: typeof ${targetExport}${originalSuffix} = (...args) => {
  return ${pluginChain}(...args)
}

export const ${targetExport} = ${targetExport}Interceptor`
      } else if (plugins.some((p) => p.type === 'replace')) {
        // Replace plugins (just export the replacement)
        const replacePlugin = plugins.find((p) => p.type === 'replace')
        if (replacePlugin) {
          return `export { ${replacePlugin.sourceExport} as ${targetExport} } from '${replacePlugin.sourceModule}'`
        }
      }
      return ''
    })
    .filter(Boolean)
    .join('\n\n    ')

  const template = `/* hash:${identifer} */
    /* eslint-disable */
    /* This file is automatically generated for ${dependency} */
    ${
      Object.values(targetExports).some((t) => t.some((p) => p.type === 'component'))
        ? "import type { DistributedOmit as OmitPrev } from 'type-fest'"
        : ''
    }

    ${pluginImports}

    ${originalImports}

    // Re-export everything from the original file except the intercepted exports
    export * from './${interceptor.target.split('/').pop()}.original'

    ${logOnce}${pluginExports}
  `

  const formatted = await prettier.format(template, {
    ...prettierConf,
    parser: 'typescript',
  })

  return { ...interceptor, template: formatted }
}
