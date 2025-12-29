import type { Resolvers } from '@graphcommerce/graphql-mesh'

export const resolvers: Resolvers = {
  StoreConfig: {
    currency: {
      selectionSet: '{ store_code }',
      resolve: (parent, args, ctx, info) => {
        if (!parent.store_code) return null
        const context = { ...ctx, headers: { store: parent.store_code } }
        return context.m2.Query.currency({ context, info }) ?? null
      },
    },
  },
}
