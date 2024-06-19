import { Resolvers } from '../.mesh'

export const resolvers: Resolvers = {
  Query: {
    products: {
      resolve: async (root, args, context, info) => {
        if (!args.filter.algolia) {
          return context.m2.Query.products({ root, args, context, info })
        }

        return {
          items: [{}],
          aggregations: [{}],
          page_info: {
            current_page: 1,
            page_size: 24,
            total_pages: 1,
          },
          total_count: 123,
          sort_fields: {
            default: 'relevance',
            options: [{ label: 'Relevance', value: 'relevance' }],
          },
          suggestions: [{ search: 'hiaho' }],
        }
      },
    },
  },
}
