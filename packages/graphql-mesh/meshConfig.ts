import type { GraphCommerceConfig } from '@graphcommerce/next-config'
import type { Config } from '@graphql-mesh/types/typings/config'

export type MeshConfigFunction = typeof meshConfig

export function meshConfig(config: Config, graphCommerceConfig: GraphCommerceConfig): Config {
  return config
}
