import { MeshContext, Resolvers } from '@graphcommerce/graphql-mesh'

export const resolvers: Resolvers = {
  Query: {
    recommendations: {
      resolve: async (root, args, context: MeshContext, info) => {
        const algoliaResponse = await context.algoliaRecommend.Mutation.algolia_getRecommendations({
          args: { recommendType: 'test' },
          selectionSet: `{
          }`,
        })
        return []
      },
    },
  },
}
