import { getStoreConfig } from '@graphcommerce/algolia-products/mesh/getStoreConfig'
import { type Resolvers } from '@graphcommerce/graphql-mesh'
import { algoliaHitToMagentoCategory, CategoriesItemsItem } from './algoliaHitToMagentoCategory'
import { getCategoryResults } from './getCategoryResults'

export const resolvers: Resolvers = {
  Query: {
    categories: async (root, args, context, info) => {
      const isAgolia = (args.filters?.engine?.in ?? [args.filters?.engine?.eq])[0] === 'algolia'

      if (!isAgolia) return context.m2.Query.categories({ root, args, context, info })

      const items: (CategoriesItemsItem | null)[] = []

      const [algoliaResponse, storeConfig] = await Promise.all([
        getCategoryResults(args, context, info),
        getStoreConfig(context),
      ])

      if (!algoliaResponse?.hits) return context.m2.Query.categories({ root, args, context, info })
      for (const hit of algoliaResponse.hits) {
        if (hit?.objectID) {
          const category = algoliaHitToMagentoCategory(hit, storeConfig)
          items.push(category)
        }
      }

      return {
        items,
        page_info: {
          current_page: algoliaResponse.page + 1,
          page_size: algoliaResponse.hitsPerPage,
          total_pages: algoliaResponse.nbPages,
        },
        total_count: algoliaResponse.nbHits,
      }
    },
  },
}
