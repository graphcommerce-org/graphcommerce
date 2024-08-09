import { ApolloLink, DefaultContext } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '../hooks'

export const xMagentoCacheIdHeader = new ApolloLink((operation, forward) => {
  operation.setContext((context: DefaultContext) => {
    const xMagentoCacheId = context.cache?.readQuery({ query: CustomerTokenDocument })
      ?.customerToken?.xMagentoCacheId
    if (!xMagentoCacheId) return context

    return { ...context, headers: { ...context.headers, 'x-magento-cache-id': xMagentoCacheId } }
  })

  return forward(operation).map((data) => {
    const { cache } = operation.getContext()
    if (!cache) return data

    type Extensions = { forwardedHeaders: Record<string, string> } | null
    const xMagentoCacheId = (data?.extensions as Extensions)?.forwardedHeaders?.[
      'x-magento-cache-id'
    ]

    if (!xMagentoCacheId) return data

    const tokenResult = cache.readQuery({ query: CustomerTokenDocument })

    if (
      !tokenResult?.customerToken ||
      tokenResult.customerToken?.xMagentoCacheId === xMagentoCacheId
    )
      return data

    cache.writeQuery({
      query: CustomerTokenDocument,
      data: { customerToken: { ...tokenResult.customerToken, xMagentoCacheId } },
    })
    return data
  })
})
