import type { DefaultContext } from '@graphcommerce/graphql'
import { ApolloLink } from '@graphcommerce/graphql'
import { map } from '@graphcommerce/graphql/rxjs'
import { CustomerTokenDocument } from '../hooks'

export const xMagentoCacheIdHeader = new ApolloLink((operation, forward) => {
  const { cache } = operation.client

  operation.setContext((context: DefaultContext) => {
    const xMagentoCacheId = cache?.readQuery({ query: CustomerTokenDocument })?.customerToken
      ?.xMagentoCacheId
    if (!xMagentoCacheId) return context

    return { ...context, headers: { ...context.headers, 'x-magento-cache-id': xMagentoCacheId } }
  })

  return forward(operation).pipe(
    map((data) => {
      if (!cache) return data

      const xMagentoCacheId = (
        data.extensions as { forwardedHeaders: Record<string, string> } | undefined
      )?.forwardedHeaders?.['x-magento-cache-id']

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
    }),
  )
})
