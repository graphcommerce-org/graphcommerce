import type { MeshContext, Resolvers } from '@graphcommerce/graphql-mesh'

export const resolvers: Resolvers = {
  Customer: {
    group_id: {
      resolve: async (root, args, context, info) => {
        const { headers } = context as MeshContext & {
          headers?: Record<string, string | undefined>
        }
        if (!headers?.authorization) return 0
        const customer = await context.m2rest.Query.m2rest_GetV1CustomersMe({
          root,
          context,
          info,
          autoSelectionSetWithDepth: 10,
        })
        return customer?.group_id ?? null
      },
    },
  },
}
