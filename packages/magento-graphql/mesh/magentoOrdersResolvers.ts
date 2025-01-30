import { execute, selectionSetTemplate, type Resolvers } from '@graphcommerce/graphql-mesh'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'

export const resolvers: Resolvers = {
  Customer: {
    orders: async (root, args, context, info) => {
      const { currentPage, pageSize, filter, scope, sort } = args

      let items =
        (
          await context.m2.Query.customer({
            info,
            context,
            selectionSet: (node) =>
              selectionSetTemplate`{ orders(pageSize: 100) { number ${node} } }`,
          })
        )?.orders?.items ?? []

      if (filter) {
        items = items.filter((order) => {
          if (!order?.number) return false

          if (filter.number) {
            if (filter.number.eq) return order?.number === filter.number.eq
            if (filter.number.in) return filter.number.in.includes(order?.number ?? '')
            if (filter.number.match) return order?.number?.match(filter.number.match)
          }
          return true
        })
      }
      if (sort) {
        items.sort((a, b) => {
          if (sort.sort_field === 'NUMBER') {
            return sort.sort_direction === 'DESC'
              ? (b?.number?.localeCompare(a?.number ?? '') ?? 0)
              : (a?.number?.localeCompare(b?.number ?? '') ?? 0)
          }
          if (sort.sort_field === 'CREATED_AT') {
            return sort.sort_direction === 'DESC'
              ? (b?.order_date?.localeCompare(a?.order_date ?? '') ?? 0)
              : (a?.order_date?.localeCompare(b?.order_date ?? '') ?? 0)
          }
          return 0
        })
      }

      const totalCount = items.length
      items = items.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      return {
        items,
        page_info: {
          total_pages: Math.ceil(totalCount / pageSize),
          current_page: currentPage,
          page_size: pageSize,
        },
        total_count: totalCount,
      }
    },
  },
}
