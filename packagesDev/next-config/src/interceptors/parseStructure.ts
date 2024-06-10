import { Module } from '@swc/core'
import get from 'lodash/get'
import { z } from 'zod'
import { GraphCommerceConfig } from '../generated/config'
import { extractExports } from './extractExports'
import { PluginConfig } from './generateInterceptor'

const pluginConfigParsed = z.object({
  type: z.enum(['component', 'function', 'replace']),
  module: z.string(),
  export: z.string(),
  ifConfig: z.union([z.string(), z.tuple([z.string(), z.string()])]).optional(),
})

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}
const isObject = (input: unknown): input is Record<string, unknown> =>
  typeof input === 'object' && input !== null && !Array.isArray(input)

export function parseStructure(ast: Module, gcConfig: GraphCommerceConfig, sourceModule: string) {
  const [exports, errors] = extractExports(ast)
  if (errors.length) console.error(`Plugin error for`, errors.join('\n'))

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

  return exportVals
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
      }

      const parsed = pluginConfigParsed.safeParse(config)

      if (!parsed.success) {
        if (errors.length)
          console.error(parsed.error.errors.map((e) => `${e.path} ${e.message}`).join('\n'))
        return undefined
      }

      let enabled = true
      if (parsed.data.ifConfig) {
        enabled = Array.isArray(parsed.data.ifConfig)
          ? get(gcConfig, parsed.data.ifConfig[0]) === parsed.data.ifConfig[1]
          : Boolean(get(gcConfig, parsed.data.ifConfig))
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
}
