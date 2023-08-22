import path from 'node:path'
import { GraphCommerceDebugConfig } from '../generated/config'
import { ResolveDependency, ResolveDependencyReturn } from '../utils/resolveDependency'

type PluginBaseConfig = {
  exported: string
  plugin: string
  enabled: boolean
  ifConfig?: string
}
export function isPluginBaseConfig(plugin: Partial<PluginBaseConfig>): plugin is PluginBaseConfig {
  return (
    typeof plugin.exported === 'string' &&
    typeof plugin.plugin === 'string' &&
    typeof plugin.enabled === 'boolean'
  )
}

type ReactPluginConfig = PluginBaseConfig & { component: string }
type MethodPluginConfig = PluginBaseConfig & { func: string }

export function isReactPluginConfig(
  plugin: Partial<PluginBaseConfig>,
): plugin is ReactPluginConfig {
  if (!isPluginBaseConfig(plugin)) return false
  return (plugin as ReactPluginConfig).component !== undefined
}

export function isMethodPluginConfig(
  plugin: Partial<PluginBaseConfig>,
): plugin is MethodPluginConfig {
  if (!isPluginBaseConfig(plugin)) return false
  return (plugin as MethodPluginConfig).func !== undefined
}

export type PluginConfig = ReactPluginConfig | MethodPluginConfig
export function isPluginConfig(plugin: Partial<PluginConfig>): plugin is PluginConfig {
  return isReactPluginConfig(plugin) || isMethodPluginConfig(plugin)
}

type Interceptor = ResolveDependencyReturn & {
  components: Record<string, ReactPluginConfig[]>
  funcs: Record<string, MethodPluginConfig[]>
  target: string
  template?: string
}

export type MaterializedPlugin = Interceptor & { template: string }

function moveRelativeDown(plugins: PluginConfig[]) {
  return [...plugins].sort((a, b) => {
    if (a.plugin.startsWith('.') && !b.plugin.startsWith('.')) return 1
    if (!a.plugin.startsWith('.') && b.plugin.startsWith('.')) return -1
    return 0
  })
}

export function generateInterceptor(
  interceptor: Interceptor,
  config: GraphCommerceDebugConfig,
): MaterializedPlugin {
  const { fromModule, dependency, components, funcs } = interceptor

  const pluginConfigs = [...Object.entries(components), ...Object.entries(funcs)]
    .map(([, plugins]) => plugins)
    .flat()

  const duplicateImports = new Set()

  const pluginImports = moveRelativeDown(
    [...pluginConfigs].sort((a, b) => a.plugin.localeCompare(b.plugin)),
  )
    .map((plugin) => {
      const { plugin: p } = plugin
      if (isReactPluginConfig(plugin))
        return `import { Plugin as ${p.split('/')[p.split('/').length - 1]} } from '${p}'`
      return `import { plugin as ${p.split('/')[p.split('/').length - 1]} } from '${p}'`
    })
    .filter((str) => {
      if (duplicateImports.has(str)) return false
      duplicateImports.add(str)
      return true
    })
    .join('\n')

  const imports = [
    ...Object.entries(components).map(([component]) => `${component} as ${component}Base`),
    ...Object.entries(funcs).map(([func]) => `${func} as ${func}Base`),
  ]

  const importInjectables =
    imports.length > 1
      ? `import { 
  ${imports.join(',\n  ')},
} from '${fromModule}'`
      : `import { ${imports[0]} } from '${fromModule}'`

  const entries: [string, PluginConfig[]][] = [
    ...Object.entries(components),
    ...Object.entries(funcs),
  ]
  const pluginExports = entries
    .map(([base, plugins]) => {
      const duplicateInterceptors = new Set()
      const name = (p: PluginConfig) => p.plugin.split('/')[p.plugin.split('/').length - 1]

      const filterNoDuplicate = (p: PluginConfig) => {
        if (duplicateInterceptors.has(name(p))) return false
        duplicateInterceptors.add(name(p))
        return true
      }

      let carry = `${base}Base`

      const pluginStr = plugins
        .reverse()
        .filter(filterNoDuplicate)
        .map((p) => {
          let result

          if (isReactPluginConfig(p)) {
            const wrapChain = plugins
              .reverse()
              .map((pl) => `<${name(pl)}/>`)
              .join(' wrapping ')
            const debugLog =
              carry === `${base}Base` && config.pluginStatus
                ? `\n  logInterceptor(\`🔌 Rendering ${base} with plugin(s): ${wrapChain} wrapping <${base}/>\`)`
                : ''

            result = `function ${name(p)}Interceptor(props: ${base}Props) {${debugLog}
  return <${name(p)} {...props} Prev={${carry}} />
}`
          } else {
            const wrapChain = plugins
              .reverse()
              .map((pl) => `${name(pl)}()`)
              .join(' wrapping ')

            const debugLog =
              carry === `${base}Base` && config.pluginStatus
                ? `\n  logInterceptor(\`🔌 Calling ${base} with plugin(s): ${wrapChain} wrapping ${base}()\`)`
                : ''

            result = `const ${name(p)}Interceptor: typeof ${base}Base = (...args) => {${debugLog}
  return ${name(p)}(${carry}, ...args)
}`
          }
          carry = `${name(p)}Interceptor`
          return result
        })
        .join('\n')

      const isComponent = plugins.every((p) => isReactPluginConfig(p))
      if (isComponent && plugins.some((p) => isMethodPluginConfig(p))) {
        throw new Error(`Cannot mix React and Method plugins for ${base} in ${dependency}.`)
      }

      return `
/**
 * Interceptor for \`${isComponent ? `<${base}/>` : `${base}()`}\` with these plugins:
 * 
${plugins.map((p) => ` * - \`${p.plugin}\``).join('\n')}
 */
${isComponent ? `type ${base}Props = ComponentProps<typeof ${base}Base>\n\n` : ``}${pluginStr}
export const ${base} = ${carry}`
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

  const componentExports = `export * from '${fromModule}'`

  const template = `/* This file is automatically generated for ${dependency} */

${componentExports}
${pluginImports}
import { ComponentProps } from 'react'
${importInjectables}
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
  // todo: Do not use reduce as we're passing the accumulator to the next iteration
  const byExportedComponent = moveRelativeDown(plugins).reduce((acc, plug) => {
    const { exported, plugin } = plug
    if (!isPluginConfig(plug) || !plug.enabled) return acc

    const resolved = resolve(exported)

    let pluginPathFromResolved = plugin
    if (plugin.startsWith('.')) {
      const resolvedPlugin = resolve(plugin)
      pluginPathFromResolved = path.relative(
        resolved.fromRoot.split('/').slice(0, -1).join('/'),
        resolvedPlugin.fromRoot,
      )
    }

    if (!acc[resolved.fromRoot])
      acc[resolved.fromRoot] = {
        ...resolved,
        target: `${resolved.fromRoot}.interceptor`,
        components: {},
        funcs: {},
      } as Interceptor

    if (isReactPluginConfig(plug)) {
      const { component } = plug
      if (!acc[resolved.fromRoot].components[component])
        acc[resolved.fromRoot].components[component] = []

      acc[resolved.fromRoot].components[component].push({
        ...plug,
        plugin: pluginPathFromResolved,
      })
    }
    if (isMethodPluginConfig(plug)) {
      const { func } = plug
      if (!acc[resolved.fromRoot].funcs[func]) acc[resolved.fromRoot].funcs[func] = []

      acc[resolved.fromRoot].funcs[func].push({
        ...plug,
        plugin: pluginPathFromResolved,
      })
    }

    return acc
  }, {} as Record<string, Interceptor>)

  return Object.fromEntries(
    Object.entries(byExportedComponent).map(([target, interceptor]) => [
      target,
      generateInterceptor(interceptor, config ?? {}),
    ]),
  )
}
