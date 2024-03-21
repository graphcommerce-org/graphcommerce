// eslint-disable-next-line import/no-extraneous-dependencies
import { parseFileSync } from '@swc/core'
import chalk from 'chalk'
// eslint-disable-next-line import/no-extraneous-dependencies
import { sync as globSync } from 'glob'
import { GraphCommerceConfig } from '../generated/config'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'
import { PluginConfig } from './generateInterceptors'
import { parseStructure } from './parseStructure'

const pluginLogs: Record<string, string> = {}

export function findPlugins(config: GraphCommerceConfig, cwd: string = process.cwd()) {
  const dependencies = resolveDependenciesSync(cwd)

  const debug = Boolean(config.debug?.pluginStatus)

  const errors: string[] = []
  const plugins: PluginConfig[] = []
  dependencies.forEach((dependency, path) => {
    const files = globSync(`${dependency}/plugins/**/*.{ts,tsx}`, { dotRelative: true })
    files.forEach((file) => {
      const sourceModule = file.replace(dependency, path).replace('.tsx', '').replace('.ts', '')

      try {
        const ast = parseFileSync(file, { syntax: 'typescript', tsx: true })
        parseStructure(ast, config, sourceModule).forEach((result) => {
          plugins.push(result)
        })
      } catch (e) {
        console.error(`Error parsing ${file}`, e)
      }
    })
  })

  if (process.env.NODE_ENV === 'development' && debug) {
    const byExported = plugins.reduce(
      (acc, plugin) => {
        const key = `🔌 ${chalk.greenBright(
          `Plugins loaded for ${plugin.targetModule}#${plugin.targetExport}`,
        )}`
        if (!acc[key]) acc[key] = []
        acc[key].push(plugin)
        return acc
      },
      {} as Record<
        string,
        Pick<PluginConfig, 'sourceModule' | 'sourceExport' | 'ifConfig' | 'enabled'>[]
      >,
    )

    const toLog: string[] = []
    Object.entries(byExported).forEach(([key, p]) => {
      const logStr = p
        .filter((c) => debug || c.enabled)
        .map((c) => {
          // eslint-disable-next-line no-nested-ternary
          const ifConfigStr = c.ifConfig
            ? Array.isArray(c.ifConfig)
              ? `${c.ifConfig[0]}=${c.ifConfig[1]}`
              : `${c.ifConfig}`
            : ''

          return `${c.enabled ? `🟢` : `⚪️`} ${c.sourceModule} ${ifConfigStr}`
        })
        .join('\n')

      if (logStr && pluginLogs[key] !== logStr) {
        toLog.push(`${key}\n${logStr}`)
        pluginLogs[key] = logStr
      }
    })

    // eslint-disable-next-line no-console
    if (toLog.length) console.log(toLog.join('\n\n'))
  }

  return [plugins, errors] as const
}
