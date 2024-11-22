import type { GraphCommerceConfig } from '@graphcommerce/next-config'
import type { YamlConfig } from '@graphql-mesh/types'

export type MeshConfigFunction = typeof meshConfig

export function meshConfig(
  config: YamlConfig.Config,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  graphCommerceConfig: GraphCommerceConfig,
): YamlConfig.Config {
  return config
}
