import type { MeshConfigFunction } from '@graphcommerce/graphql-mesh/meshConfig'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  module: '@graphcommerce/graphql-mesh/meshConfig',
  type: 'function',
}

/**
 * This plugin does not apply any changes to the Mesh configuration, but solely exists to generate the meshConfig.interceptor.ts file.
 */
export const meshConfig: FunctionPlugin<MeshConfigFunction> = (prev, ...args) => prev(...args)
