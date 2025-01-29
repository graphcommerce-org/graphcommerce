import type { Module } from '@swc/core'
import lodash from 'lodash'
import { z } from 'zod'
import type { GraphCommerceConfig } from '../generated/config'
import { extractExports } from './extractExports'
import type { PluginConfig } from './generateInterceptor'

const pluginConfigParsed = z.object({
  type: z.enum(['component', 'function', 'replace']),
  module: z.string(),
  export: z.string(),
  ifConfig: z.union([z.string(), z.tuple([z.string(), z.unknown()])]).optional(),
})

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}
const isObject = (input: unknown): input is Record<string, unknown> =>
  typeof input === 'object' && input !== null && !Array.isArray(input)

export function parseStructure(ast: Module, gcConfig: GraphCommerceConfig, sourceModule: string) {
  const [exports, errors] = extractExports(ast)
  if (errors.length) console.error('Plugin error for', errors.join('\n'))

  const {
    config: moduleConfig,
    component,
    func,
    exported,
    ifConfig,
    plugin,
    Plugin,
    ...rest
  } = exports

  const exportVals = Object.keys(rest)

  if (component && !moduleConfig) exportVals.push('Plugin')
  if (func && !moduleConfig) exportVals.push('plugin')

  const pluginConfigs = exportVals
    .map((exportVal) => {
      let config = isObject(moduleConfig) ? moduleConfig : {}

      if (!moduleConfig && component) {
        config = { type: 'component', module: exported, ifConfig, export: 'Plugin' }
      } else if (!moduleConfig && func) {
        config = { type: 'function', module: exported, ifConfig, export: 'plugin' }
      } else if (isObject(moduleConfig)) {
        config = { ...moduleConfig, export: exportVal }
      } else {
        console.error(`Plugin configuration invalid! See ${sourceModule}`)
        return null
      }

      const parsed = pluginConfigParsed.safeParse(config)

      if (!parsed.success) {
        if (errors.length)
          console.error(parsed.error.errors.map((e) => `${e.path} ${e.message}`).join('\n'))
        return undefined
      }

      let enabled = true

      if (parsed.data.ifConfig) {
        if (Array.isArray(parsed.data.ifConfig)) {
          const isBoolean = typeof parsed.data.ifConfig[1] === 'boolean'
          let confValue = lodash.get(gcConfig, parsed.data.ifConfig[0])
          confValue = isBoolean ? Boolean(confValue) : confValue

          enabled = confValue === parsed.data.ifConfig[1]
        } else {
          enabled = Boolean(lodash.get(gcConfig, parsed.data.ifConfig))
        }
      }

      const val: PluginConfig = {
        targetExport:
          (exports.component as string) || (exports.func as string) || parsed.data.export,
        sourceModule,
        sourceExport: parsed.data.export,
        targetModule: parsed.data.module,
        type: parsed.data.type,
        enabled,
      }
      if (parsed.data.ifConfig) val.ifConfig = parsed.data.ifConfig
      return val
    })
    .filter(nonNullable)

  const newPluginConfigs = pluginConfigs.reduce<PluginConfig[]>((acc, pluginConfig) => {
    if (
      !acc.find((accPluginConfig) => accPluginConfig.sourceExport === pluginConfig.sourceExport)
    ) {
      acc.push(pluginConfig)
    }
    return acc
  }, [])

  return newPluginConfigs
}
