import { type Resolvers } from '@graphcommerce/graphql-mesh'
import { getStoreConfig } from '../getStoreConfig'
import { algoliaHitToMagentoCategory, CategoriesItemsItem } from './algoliaHitToMagentoCategory'
import { getCategoryResults } from './getCategoryResults'

export const resolvers: Resolvers = {
  Query: {
    categories: async (root, args, context, info) => {
      const isAgolia = (args.filters?.engine?.in ?? [args.filters?.engine?.eq])[0] === 'algolia'

      if (!isAgolia) return context.m2.Query.categories({ root, args, context, info })
      const algoliaResponse = await getCategoryResults(args, context, info)
      const items: (CategoriesItemsItem | null)[] = []
      const storeConfig = await getStoreConfig(context)
      if (!algoliaResponse?.hits) {
        return {
          items: [],
          page_info: {
            current_page: 1,
            page_size: 20,
            total_pages: 1,
          },
          total_count: 0,
        }
      }
      for (const hit of algoliaResponse.hits) {
        if (hit?.objectID) {
          const category = algoliaHitToMagentoCategory(hit, storeConfig)
          items.push(category)
        }
      }

      return {
        items,
        page_info: {
          current_page: 1,
          page_size: 20,
          total_pages: 1,
        },
        total_count: 0,
      }
    },
  },
}
