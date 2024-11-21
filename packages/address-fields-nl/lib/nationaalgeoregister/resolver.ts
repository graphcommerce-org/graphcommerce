import type { Resolvers } from '@graphcommerce/graphql-mesh'

const simplify = (str: string | null | undefined) => str?.replace(/-|\s/g, '').toUpperCase()

const resolvers: Resolvers = {
  Query: {
    postcodeNL: async (root, args, context, info) => {
      const postcode = simplify(args.postcode)
      const housenumber = simplify(args.housenumber)

      const ressie = await context.nationaalgeoregister.Query.nationaalgeoregisterPostcodeService({
        selectionSet: `{
          response {
            docs {
              straatnaam
              huis_nlt
              postcode
              woonplaatsnaam
            }
          }
        }`,
        args: { housenumber, postcode },
        context,
        info,
      })

      const found = ressie?.response?.docs?.find((d) => {
        if (simplify(d?.postcode) !== postcode) return false
        if (simplify(d?.huis_nlt) !== housenumber) return false
        return true
      })

      if (!found?.woonplaatsnaam || !found.straatnaam) throw Error("Can't find matching address")

      return { city: found.woonplaatsnaam, street: found.straatnaam }
    },
  },
}

export default resolvers
