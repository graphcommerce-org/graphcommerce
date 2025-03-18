import { createGatewayRuntime } from '@graphql-hive/gateway-runtime'

export default createGatewayRuntime({
  graphqlEndpoint: '/api/graphql',
  supergraph: 'supergraph.graphql',
  additionalResolvers: [],
  upstreamRetry: {
    maxRetries: 6,
    retryDelay: 200,
    retryDelayFactor: 2,
    shouldRetry: ({ response }) => response?.status === 429,
  },
  transportEntries: {
    M2: { options: { apq: true } },
  },
  propagateHeaders: {
    fromSubgraphsToClient: ({ response }) => {
      const cacheId = response.headers.get('x-magento-cache-id')
      if (cacheId) return { 'x-magento-cache-id': cacheId }
    },
  },
  deferStream: true,
  // responseCaching: {
  //   session: function (
  //     request: Request,
  //     context: YogaInitialContext,
  //   ): PromiseOrValue<Maybe<string>> {
  //     throw new Error('Function not implemented.')
  //   },
  // },
  graphiql: true,
})

export const config = { api: { externalResolver: true } }
