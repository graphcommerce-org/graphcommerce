import { previewModeDefaults as base } from '@graphcommerce/ecommerce-ui'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/ecommerce-ui',
}

export const previewModeDefaults: FunctionPlugin<typeof base> = (prev, ...args) => ({
  ...prev(...args),
  hygraphStage: 'PUBLISHED',
})
