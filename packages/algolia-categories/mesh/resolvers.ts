import { nonNullable } from '@graphcommerce/algolia-products'
import { type Resolvers } from '@graphcommerce/graphql-mesh'
import type { GraphQLError } from 'graphql'
import { algoliaHitToMagentoCategory } from './algoliaHitToMagentoCategory'
import { getCategoryResults } from './getCategoryResults'

function isGraphQLError(err: unknown): err is GraphQLError {
  return !!(err as GraphQLError)?.message
}

export const resolvers: Resolvers = {
  Query: {
    categories: async (root, args, context, info) => {
      const isAgolia = (args.filters?.engine?.in ?? [args.filters?.engine?.eq])[0] === 'algolia'

      if (!isAgolia) return context.m2.Query.categories({ root, args, context, info })

      const searchResults = await getCategoryResults(args, context, info)

      if (isGraphQLError(searchResults))
        return context.m2.Query.categories({ root, args, context, info })

      return {
        items: (searchResults?.hits ?? []).filter(nonNullable).map(algoliaHitToMagentoCategory),
        page_info: {
          current_page: (searchResults?.page ?? 0) + 1,
          page_size: searchResults?.hitsPerPage,
          total_pages: searchResults?.nbPages,
        },
        total_count: searchResults?.nbHits,
      }
    },
  },
}
