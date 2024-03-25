// eslint-disable-next-line import/no-extraneous-dependencies
import prettierConf from '@graphcommerce/prettier-config-pwa'
// eslint-disable-next-line import/no-extraneous-dependencies
import prettier from 'prettier'
import { GraphCommerceDebugConfig } from '../generated/config'
import { ResolveDependencyReturn } from '../utils/resolveDependency'
import { RenameVisitor } from './RenameVisitor'
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
  `${plugin.sourceExport}${plugin.sourceModule
    .split('/')
    [plugin.sourceModule.split('/').length - 1].replace(/[^a-zA-Z0-9]/g, '')}`

const fileName = (plugin: PluginConfig) => `${plugin.sourceModule}#${plugin.sourceExport}`

const originalName = (n: string) => `${n}${originalSuffix}`
const sourceName = (n: string) => `${n}${sourceSuffix}`
const interceptorName = (n: string) => `${n}${interceptorSuffix}`
const interceptorPropsName = (n: string) => `${interceptorName(n)}Props`

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
  oldInterceptorSource?: string,
): Promise<MaterializedPlugin> {
  const identifer = generateIdentifyer(JSON.stringify(interceptor) + JSON.stringify(config))

  const { dependency, targetExports, source } = interceptor

  if (oldInterceptorSource && identifer === extractIdentifier(oldInterceptorSource))
    return { ...interceptor, template: oldInterceptorSource }

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
      const carryProps: string[] = []

      const pluginStr = plugins
        .reverse()
        .filter((p: PluginConfig) => {
          if (duplicateInterceptors.has(name(p))) return false
          duplicateInterceptors.add(name(p))
          return true
        })
        .map((p) => {
          let result

          const wrapChain = plugins
            .reverse()
            .map((pl) => name(pl))
            .join(' wrapping ')

          if (isReplacePluginConfig(p)) {
            new RenameVisitor([originalName(p.targetExport)], (s) =>
              s.replace(originalSuffix, disabledSuffix),
            ).visitModule(ast)

            carryProps.push(interceptorPropsName(name(p)))

            result = `type ${interceptorPropsName(name(p))} = React.ComponentProps<typeof ${sourceName(name(p))}>`
          }

          if (isReactPluginConfig(p)) {
            carryProps.push(interceptorPropsName(name(p)))

            result = `
              type ${interceptorPropsName(name(p))} = DistributedOmit<React.ComponentProps<typeof ${sourceName(name(p))}>, 'Prev'>
              const ${interceptorName(name(p))} = (props: ${carryProps.join(' & ')}) => {
                ${config.pluginStatus ? `logOnce(\`🔌 Rendering ${base} with plugin(s): ${wrapChain} wrapping <${base}/>\`)` : ''}

                ${
                  process.env.NODE_ENV === 'development' &&
                  `if(!props['data-plugin'])
                  logOnce('${fileName(p)} does not spread props to prev: <Prev {...props}/>. This will cause issues if multiple plugins are applied to this component.')`
                }
                return <${sourceName(name(p))} {...props} Prev={${carry} as React.FC} />
              }`
          }

          if (isMethodPluginConfig(p)) {
            result = `const ${interceptorName(name(p))}: typeof ${carry} = (...args) => {
                ${config.pluginStatus ? `logOnce(\`🔌 Calling ${base} with plugin(s): ${wrapChain} wrapping ${base}()\`)` : ''}
                return ${sourceName(name(p))}(${carry}, ...args)
              }`
          }

          carry = p.type === 'replace' ? sourceName(name(p)) : interceptorName(name(p))
          return result
        })
        .filter((v) => !!v)
        .join('\n')

      const isComponent = plugins.every((p) => isReplacePluginConfig(p) || isReactPluginConfig(p))
      if (isComponent && plugins.some((p) => isMethodPluginConfig(p))) {
        throw new Error(`Cannot mix React and Method plugins for ${base} in ${dependency}.`)
      }

      if (process.env.NODE_ENV === 'development' && isComponent) {
        return `${pluginStr}
          export const ${base}: typeof ${carry} = (props) => {
            return <${carry} {...props} data-plugin />
          }`
      }

      return `
        ${pluginStr}
        export const ${base} = ${carry}
      `
    })
    .join('\n')

  const logOnce =
    config.pluginStatus || process.env.NODE_ENV === 'development'
      ? `
        const logged: Set<string> = new Set();
        const logOnce = (log: string, ...additional: unknown[]) => {
          if (logged.has(log)) return
          logged.add(log)
          console.warn(log, ...additional)
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

  let templateFormatted
  try {
    templateFormatted = await prettier.format(template, { ...prettierConf, parser: 'typescript' })
  } catch (e) {
    console.log('Error formatting interceptor: ', e, 'using raw template.')
    templateFormatted = template
  }

  return { ...interceptor, template: templateFormatted }
}
