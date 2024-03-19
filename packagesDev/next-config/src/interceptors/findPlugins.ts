import { Module, parseFileSync } from '@swc/core'
// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from 'chalk'
import { sync as globSync } from 'glob'
import get from 'lodash/get'
import { extractExportedConstValue } from 'next/dist/build/analysis/extract-const-value'
import { z } from 'zod'
import { GraphCommerceConfig } from '../generated/config'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'
import { IfConfig } from '../index'
import { PluginConfig } from './generateInterceptors'

const pluginConfigParsed = z.object({
  type: z.enum(['component', 'method', 'replace']),
  module: z.string(),
  ifConfig: z.union([z.string(), z.tuple([z.string(), z.string()])]).optional(),
})

function maybeExtractExportedConstValue(ast: Module, name: string) {
  try {
    return extractExportedConstValue(ast, name)
  } catch (e) {
    return undefined
  }
}

function parseStructure(file: string) {
  const ast = parseFileSync(file, { syntax: 'typescript', tsx: true })

  const component = maybeExtractExportedConstValue(ast, 'component')
  const exported = maybeExtractExportedConstValue(ast, 'exported')
  const ifConfig = maybeExtractExportedConstValue(ast, 'ifConfig')
  const func = maybeExtractExportedConstValue(ast, 'func')

  let config = maybeExtractExportedConstValue(ast, 'config') as
    | z.infer<typeof pluginConfigParsed>
    | undefined

  if (!config) {
    config = {
      // eslint-disable-next-line no-nested-ternary
      type: component ? 'component' : func ? 'method' : 'replace',
      module: exported,
      ifConfig,
    }
  }

  const parsed = pluginConfigParsed.safeParse(config)

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((e) => `${e.path} ${e.message}`).join('\n'))
  }
  return parsed.data
}

const pluginLogs: Record<string, string> = {}

export function findPlugins(config: GraphCommerceConfig, cwd: string = process.cwd()) {
  const dependencies = resolveDependenciesSync(cwd)

  const debug = Boolean(config.debug?.pluginStatus)

  const errors: string[] = []
  const plugins: PluginConfig[] = []
  dependencies.forEach((dependency, path) => {
    const files = globSync(`${dependency}/plugins/**/*.{ts,tsx}`, { dotRelative: true })
    files.forEach((file) => {
      try {
        const result = parseStructure(file)

        if (!result) return

        let enabled = true
        if (result.ifConfig) {
          enabled = Array.isArray(result.ifConfig)
            ? get(config, result.ifConfig[0]) === result.ifConfig[1]
            : Boolean(get(config, result.ifConfig))
        }

        const plugin = file.replace(dependency, path).replace('.tsx', '').replace('.ts', '')
        const pluginConfig: PluginConfig = { plugin, ...result, enabled }

        plugins.push(pluginConfig)
      } catch (e) {
        console.error(`Error parsing ${file}`, e)
      }
    })
  })

  if (process.env.NODE_ENV === 'development' && debug) {
    const byExported = plugins.reduce(
      (acc, plugin) => {
        const key = `🔌 ${chalk.greenBright(
          `Plugins loaded for ${plugin.exported}#${plugin.exportString}`,
        )}`
        if (!acc[key]) acc[key] = []
        acc[key].push(plugin)
        return acc
      },
      {} as Record<string, Pick<PluginConfig, 'plugin' | 'ifConfig' | 'enabled'>[]>,
    )

    const toLog: string[] = []
    Object.entries(byExported).forEach(([key, p]) => {
      const logStr = p
        .filter((c) => debug || c.enabled)
        .map(
          (c) =>
            `${c.enabled ? `🟢` : `⚪️`} ${c.plugin} ${
              c.ifConfig ? `(${c.ifConfig}: ${c.enabled ? 'true' : 'false'})` : ''
            }`,
        )
        .join('\n')

      if (logStr && pluginLogs[key] !== logStr) {
        toLog.push(`${key}\n${logStr}`)
        pluginLogs[key] = logStr
      }
    })

    // eslint-disable-next-line no-console
    console.log(toLog.join('\n\n'))
  }

  return [plugins, errors] as const
}
