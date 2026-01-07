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

// Create a stable string representation of an object by sorting keys recursively
const stableStringify = (obj: any): string => {
  if (obj === null || obj === undefined) return String(obj)
  if (typeof obj !== 'object') return String(obj)
  if (Array.isArray(obj)) return `[${obj.map(stableStringify).join(',')}]`

  const keys = Object.keys(obj).sort()
  const pairs = keys.map((key) => `${JSON.stringify(key)}:${stableStringify(obj[key])}`)
  return `{${pairs.join(',')}}`
}

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
  // Create a stable hash based only on the content that affects the output
  const hashInput = {
    dependency: interceptor.dependency,
    targetExports: interceptor.targetExports,
    // Only include config properties that affect the output
    debugConfig: config.pluginStatus ? { pluginStatus: config.pluginStatus } : {},
  }
  const identifer = generateIdentifyer(stableStringify(hashInput))

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

  // Generate imports for original components (only when no replace plugin exists)
  const originalImports = [...Object.entries(targetExports)]
    .filter(([targetExport, plugins]) => {
      // Only import original if there's no replace plugin for this export
      return !plugins.some((p) => p.type === 'replace')
    })
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

        // Build interceptor chain - each plugin wraps the previous one
        // Check if there's a replace plugin to use as the base instead of original
        const replacePlugin = plugins.find((p) => p.type === 'replace')
        let carry = replacePlugin
          ? sourceName(name(replacePlugin))
          : `${targetExport}${originalSuffix}`
        const pluginSee: string[] = []

        if (replacePlugin) {
          pluginSee.push(
            `@see {${sourceName(name(replacePlugin))}} for source of replaced component`,
          )
        } else {
          pluginSee.push(
            `@see {@link file://./${targetExport}.original.tsx} for original source file`,
          )
        }

        // Track the accumulated props type name for chaining
        let prevPropsName: string | null = null

        const pluginInterceptors = componentPlugins
          .reverse() // Start from the last plugin and work backwards
          .map((plugin) => {
            const pluginName = sourceName(name(plugin))
            const interceptorName = `${pluginName}${interceptorSuffix}`
            const propsName = `${pluginName}Props`

            pluginSee.push(`@see {${pluginName}} for source of applied plugin`)

            // For the first plugin, just use OmitPrev
            // For subsequent plugins, intersect with the previous accumulated props
            const propsType = prevPropsName
              ? `OmitPrev<React.ComponentProps<typeof ${pluginName}>, 'Prev'> & ${prevPropsName}`
              : `OmitPrev<React.ComponentProps<typeof ${pluginName}>, 'Prev'>`

            const result = `type ${propsName} = ${propsType}

const ${interceptorName} = (
  props: ${propsName},
) => (
  <${pluginName}
    {...props}
    Prev={${carry}}
  />
)`
            carry = interceptorName
            prevPropsName = propsName
            return result
          })
          .join('\n\n')

        const seeString = `/**
 * Here you see the 'interceptor' that is applying all the configured plugins.
 *
 * This file is NOT meant to be modified directly and is auto-generated if the plugins or the
 * original source changes.
 *
${pluginSee.map((s) => ` * ${s}`).join('\n')}
 */`

        // Cast to preserve generic signatures while also including accumulated plugin props
        const originalType = replacePlugin
          ? `typeof ${sourceName(name(replacePlugin))}`
          : `typeof ${targetExport}${originalSuffix}`

        // If we have accumulated props from plugins, include them in the type
        // This creates a type that has both the original's generics AND the plugin's additional props
        const exportType = prevPropsName
          ? `${originalType} & React.FC<${prevPropsName}>`
          : originalType

        return `${pluginInterceptors}

${seeString}
export const ${targetExport} = ${carry} as ${exportType}`
      } else if (plugins.some((p) => p.type === 'function')) {
        // Function plugins
        const functionPlugins = plugins.filter((p) => p.type === 'function')

        // Build interceptor chain - each plugin wraps the previous one
        // Check if there's a replace plugin to use as the base instead of original
        const replacePlugin = plugins.find((p) => p.type === 'replace')
        let carry = replacePlugin
          ? sourceName(name(replacePlugin))
          : `${targetExport}${originalSuffix}`
        const pluginSee: string[] = []

        if (replacePlugin) {
          pluginSee.push(
            `@see {${sourceName(name(replacePlugin))}} for source of replaced function`,
          )
        } else {
          pluginSee.push(
            `@see {@link file://./${targetExport}.original.ts} for original source file`,
          )
        }

        const pluginInterceptors = functionPlugins
          .reverse() // Start from the last plugin and work backwards
          .map((plugin) => {
            const pluginName = sourceName(name(plugin))
            const interceptorName = `${pluginName}${interceptorSuffix}`

            pluginSee.push(`@see {${pluginName}} for source of applied plugin`)

            const result = `const ${interceptorName}: typeof ${carry} = (...args) => {
  return ${pluginName}(${carry}, ...args)
}`
            carry = interceptorName
            return result
          })
          .join('\n')

        const seeString = `/**
 * Here you see the 'interceptor' that is applying all the configured plugins.
 *
 * This file is NOT meant to be modified directly and is auto-generated if the plugins or the
 * original source changes.
 *
${pluginSee.map((s) => ` * ${s}`).join('\n')}
 */`

        return `${pluginInterceptors}

${seeString}
export const ${targetExport} = ${carry}`
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
