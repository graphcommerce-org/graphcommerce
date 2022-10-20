import fs from 'node:fs'
import path from 'path'
import glob from 'glob'
import { resolveDependenciesSync } from './utils/resolveDependenciesSync'
import { ResolveDependency, ResolveDependencyReturn } from './utils/resolveDependency'

export type PluginConfig = {
  component: string
  exported: string
  plugin: string
}

type Plugin = ResolveDependencyReturn & {
  components: Record<string, PluginConfig[]>
  target: string
  template?: string
}

export type MaterializedPlugin = Plugin & { template: string }

export function generateInterceptor(plugin: Plugin): MaterializedPlugin {
  const { fromModule, components } = plugin

  const importInjectables = `import { ${Object.entries(components)
    .map(([component]) => `${component} as ${component}Base`)
    .join(', ')} } from '${fromModule}'`

  const pluginImports = Object.entries(components)
    .map(([_, plugins]) =>
      plugins
        .sort((a, b) => a.plugin.localeCompare(b.plugin))
        .map(
          (p) =>
            `import { plugin as ${p.plugin.split('/')[p.plugin.split('/').length - 1]} } from '${
              p.plugin
            }'`,
        )
        .join('\n'),
    )
    .join('\n')

  const pluginExports = Object.entries(components)
    .map(
      ([component, plugins]) => `// eslint-disable-next-line import/export
export const ${component} = [${plugins
        .map((p) => p.plugin.split('/')[p.plugin.split('/').length - 1])
        .join(', ')}].reduce(
  (acc, plugin) => plugin(acc),
  ${component}Base,
)
`,
    )
    .join('\n')

  const componentExports = `// eslint-disable-next-line import/export
export * from '${fromModule}'`

  const explanation = `// This interceptor is automatically generated and is loaded by webpack to replace the original export.
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/export */`
  const template = [
    explanation,
    pluginImports,
    importInjectables,
    componentExports,
    pluginExports,
  ].join('\n\n')

  return { ...plugin, template }
}

export type GenerateInterceptorsReturn = Record<string, MaterializedPlugin>

export function generateInterceptors(
  plugins: PluginConfig[],
  resolve: ResolveDependency,
): GenerateInterceptorsReturn {
  // todo: Do not use reduce as we're passing the accumulator to the next iteration
  const byExportedComponent = plugins.reduce((acc, plug) => {
    const { exported } = plug
    const resolved = resolve(exported)

    if (!acc[resolved.fromRoot])
      acc[resolved.fromRoot] = {
        ...resolved,
        target: `${resolved.fromRoot}.interceptor`,
        components: {},
      } as Plugin

    if (!acc[resolved.fromRoot].components[plug.component])
      acc[resolved.fromRoot].components[plug.component] = []

    acc[resolved.fromRoot].components[plug.component].push(plug)
    return acc
  }, {} as Record<string, Plugin>)

  return Object.fromEntries(
    Object.entries(byExportedComponent).map(([target, plg]) => [target, generateInterceptor(plg)]),
  )
}

export function rmInterceptors(cwd: string = process.cwd()): string[] {
  const dependencies = resolveDependenciesSync(cwd)

  const removed: string[] = []
  dependencies.forEach((dependency) => {
    const files = glob.sync(`${dependency}/**/*.interceptor.tsx`, { cwd })
    files.forEach((file) => {
      fs.unlinkSync(file)
      removed.push(file)
    })
  })
  return removed
}

export function writeInterceptors(
  interceptors: GenerateInterceptorsReturn,
  cwd: string = process.cwd(),
) {
  Object.entries(interceptors).forEach(([target, plugin]) => {
    // eslint-disable-next-line no-console
    const fileToWrite = `${path.join(cwd, plugin.fromRoot)}.interceptor.tsx`
    fs.writeFileSync(fileToWrite, plugin.template)
  })
}
