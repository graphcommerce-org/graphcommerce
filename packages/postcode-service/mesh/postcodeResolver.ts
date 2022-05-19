import type { Resolvers } from '@graphcommerce/graphql-mesh'

/**
 * https://github.com/PDOK/locatieserver/wiki/Zoekvoorbeelden-Locatieserver
 *
 * Can be used for postcode or an autocomplete:
 *
 * https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?wt=json&q=2371%20DJ%2085
 * https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?fq=postcode:2371DJ&q=85
 * https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?fq=postcode:2661PH&q=6
 * https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?wt=json&q=Noordplein%2085&lat=52.2461&lon=6.1873
 * OR https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?wt=xml&q=2371DJ%2085
 * https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?wt=xml&id=adr-73290e78d2e9f7c6931a9b4cf2e15a4e
 */

export const resolvers: Resolvers = {
  Query: {
    postcodeServiceNL: {
      selectionSet: `{ straatnaam }`,
      resolve: async (root, args, context, info) => {
        const result = await context.postcodeService.Query.postcodeServiceNL({
          root,
          args,
          context,
          info,
        })

        if (result?.straatnaam?.includes('limiet bereikt')) {
          throw new Error(result.straatnaam)
        }

        return result || null
      },
    },
  },
}

export default resolvers
