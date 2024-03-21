import path from 'node:path'
import { parseSync, printSync } from '@swc/core'
import { GraphCommerceDebugConfig } from '../generated/config'
import { ResolveDependency, ResolveDependencyReturn } from '../utils/resolveDependency'
import { findOriginalSource } from './findOriginalSource'
import { RenameVisitor } from './removeExports'

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

type Interceptor = ResolveDependencyReturn & {
  targetExports: Record<string, PluginConfig[]>
  target: string
  source: string
  template?: string
}

export type MaterializedPlugin = Interceptor & { template: string }

function moveRelativeDown(plugins: PluginConfig[]) {
  return [...plugins].sort((a, b) => {
    if (a.sourceModule.startsWith('.') && !b.sourceModule.startsWith('.')) return 1
    if (!a.sourceModule.startsWith('.') && b.sourceModule.startsWith('.')) return -1
    return 0
  })
}

export const SOURCE_START = '/** ❗️ Original (modified) source starts here **/'
export const SOURCE_END = '/** ❗️ Original (modified) source ends here **/'

const originalSuffix = '_original'
const sourceSuffix = '_source'
const interceptorSuffix = '_interceptor'
const disabledSuffix = '_DISABLED'
const name = (plugin: PluginConfig) =>
  plugin.sourceExport === 'plugin' || plugin.sourceExport === 'Plugin'
    ? plugin.sourceModule.split('/')[plugin.sourceModule.split('/').length - 1]
    : plugin.sourceExport
const originalName = (n: string) => `${n}${originalSuffix}`
const sourceName = (n: string) => `${n}${sourceSuffix}`
const interceptorName = (n: string) => `${n}${interceptorSuffix}`

export function generateInterceptor(
  interceptor: Interceptor,
  config: GraphCommerceDebugConfig,
): MaterializedPlugin {
  const { dependency, targetExports, source } = interceptor

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

  const ast = parseSync(source, { syntax: 'typescript', tsx: true, comments: true })

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
              : `(
  <${sourceName(name(p))} {...props} Prev={${carry}} />
)`

            result = `const ${interceptorName(name(p))} = (props: InterceptorProps<typeof ${name(p)}>) => ${body}`
          }

          if (isMethodPluginConfig(p)) {
            const wrapChain = plugins
              .reverse()
              .map((pl) => `${name(pl)}()`)
              .join(' wrapping ')

            const body = config.pluginStatus
              ? `{
  logInterceptor(
    \`🔌 Calling ${base} with plugin(s): ${wrapChain} wrapping ${base}()\`
  )
  return ${sourceName(name(p))}(${carry}, ...args)
}`
              : `
${sourceName(name(p))}(${carry}, ...args)`

            result = `const ${interceptorName(name(p))}: typeof ${carry} = (...args) => ${body}
`
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

  const template = `// eslint-disable
/* This file is automatically generated for ${dependency} */
${
  Object.values(targetExports).some((t) => t.some((p) => p.type === 'component'))
    ? `import type { InterceptorProps } from '@graphcommerce/next-config'
`
    : ''
}
${pluginImports}

${SOURCE_START}
${printSync(ast).code}
${SOURCE_END}
${logOnce}${pluginExports}
`

  return { ...interceptor, template }
}

export type GenerateInterceptorsReturn = Record<string, MaterializedPlugin>

export function generateInterceptors(
  plugins: PluginConfig[],
  resolve: ResolveDependency,
  config?: GraphCommerceDebugConfig | null | undefined,
): GenerateInterceptorsReturn {
  const byTargetModuleAndExport = moveRelativeDown(plugins).reduce<Record<string, Interceptor>>(
    (acc, plug) => {
      let { sourceModule: pluginPath } = plug
      if (!isPluginConfig(plug) || !plug.enabled) return acc

      const result = resolve(plug.targetModule, { includeSources: true })
      const { error, resolved } = findOriginalSource(plug, result, resolve)

      if (error) {
        return acc
      }

      const { fromRoot } = resolved

      if (pluginPath.startsWith('.')) {
        const resolvedPlugin = resolve(pluginPath)
        if (resolvedPlugin) {
          pluginPath = path.relative(
            resolved.fromRoot.split('/').slice(0, -1).join('/'),
            resolvedPlugin.fromRoot,
          )
        }
      }

      if (!acc[resolved.fromRoot]) {
        acc[resolved.fromRoot] = {
          ...resolved,
          target: `${resolved.fromRoot}.interceptor`,
          targetExports: {},
        } as Interceptor
      }

      if (!acc[fromRoot].targetExports[plug.targetExport])
        acc[fromRoot].targetExports[plug.targetExport] = []

      acc[fromRoot].targetExports[plug.targetExport].push({ ...plug, sourceModule: pluginPath })

      return acc
    },
    {},
  )

  return Object.fromEntries(
    Object.entries(byTargetModuleAndExport).map(([target, interceptor]) => [
      target,
      generateInterceptor(interceptor, config ?? {}),
    ]),
  )
}
