import { parseFileSync } from '@swc/core'
import chalk from 'chalk'
import { sync as globSync } from 'glob'
import get from 'lodash/get'
import type { Path } from 'react-hook-form'
import { GraphCommerceConfig } from '../generated/config'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'
import {
  isMethodPluginConfig,
  isPluginBaseConfig,
  isPluginConfig,
  isReactPluginConfig,
  PluginConfig,
} from './generateInterceptors'

type ParseResult = {
  component?: string
  exported?: string
  ifConfig?: Path<GraphCommerceConfig>
}

function parseStructure(file: string): ParseResult {
  const ast = parseFileSync(file, { syntax: 'typescript', tsx: true })

  const imports: Record<string, string> = {}
  const exports: Record<string, string> = {}

  ast.body.forEach((node) => {
    if (node.type === 'ImportDeclaration') {
      node.specifiers.forEach((s) => {
        if (s.type === 'ImportSpecifier') {
          imports[s.local.value] = node.source.value
        }
      })
    }
    if (node.type === 'ExportDeclaration' && node.declaration.type === 'VariableDeclaration') {
      node.declaration.declarations.forEach((declaration) => {
        if (declaration.init?.type === 'StringLiteral' && declaration.id.type === 'Identifier') {
          exports[declaration.id.value] = declaration.init.value
        }
      })
    }
  })

  return exports as ParseResult
}

const pluginLogs: Record<string, string> = {}

export function findPlugins(config: GraphCommerceConfig, cwd: string = process.cwd()) {
  const dependencies = resolveDependenciesSync(cwd)

  const debug = Boolean(config.debug?.pluginStatus)

  const errors: string[] = []
  const plugins: PluginConfig[] = []
  dependencies.forEach((dependency, path) => {
    const files = globSync(`${dependency}/plugins/**/*.{ts,tsx}`)
    files.forEach((file) => {
      try {
        const result = parseStructure(file)
        if (!result) return

        const pluginConfig = {
          plugin: file.replace(dependency, path).replace('.tsx', '').replace('.ts', ''),
          ...result,
          enabled: !result.ifConfig || Boolean(get(config, result.ifConfig)),
        }

        if (!isPluginConfig(pluginConfig)) {
          if (!isPluginBaseConfig(pluginConfig))
            errors.push(
              `Plugin ${file} is not a valid plugin, make it has "export const exported = '@graphcommerce/my-package"`,
            )
          else if (file.endsWith('.ts')) {
            errors.push(
              `Plugin ${file} is not a valid plugin, please define the method to create a plugin for "export const method = 'someMethod'"`,
            )
          } else if (file.endsWith('.tsx')) {
            errors.push(
              `Plugin ${file} is not a valid plugin, please define the compoennt to create a plugin for "export const component = 'SomeComponent'"`,
            )
          }
        } else {
          plugins.push(pluginConfig)
        }
      } catch (e) {
        console.error(`Error parsing ${file}`, e)
      }
    })
  })

  if (process.env.NODE_ENV === 'development' && debug) {
    const byExported = plugins.reduce(
      (acc, plugin) => {
        const componentStr = isReactPluginConfig(plugin) ? plugin.component : ''
        const funcStr = isMethodPluginConfig(plugin) ? plugin.func : ''
        const key = `🔌 ${chalk.greenBright(
          `Plugins loaded for ${plugin.exported}#${componentStr}${funcStr}`,
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
