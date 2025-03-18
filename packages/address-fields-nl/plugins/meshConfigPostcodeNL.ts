import type { meshConfig as meshConfigBase } from '@graphcommerce/graphql-mesh/meshConfig'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  module: '@graphcommerce/graphql-mesh/meshConfig',
  type: 'function',
}

// sources:
//   - name: nationaalgeoregister
//     handler:
//       jsonSchema:
//         endpoint: https://api.pdok.nl/bzk/locatieserver/search/v3_1/
//         operations:
//           - type: Query
//             field: nationaalgeoregisterPostcodeService
//             path: /free?fq=type:adres&fq=postcode:{args.postcode}&q={args.housenumber}
//             method: GET
//             responseSample: 'lib/nationaalgeoregister/responseSample.json'
// additionalResolvers:
//   - lib/nationaalgeoregister/resolver

export const meshConfig: FunctionPlugin<typeof meshConfigBase> = (
  prev,
  baseConfig,
  graphCommerceConfig,
) =>
  prev(
    {
      sources: [...baseConfig.sources],
      additionalResolvers: [
        ...(baseConfig.additionalResolvers ?? []),
        '@graphcommerce/algolia-categories/mesh/resolvers.ts',
      ],
    },
    graphCommerceConfig,
  )
