import { ApolloError, useApolloClient } from '@graphcommerce/graphql'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { t } from '@graphcommerce/lingui-next'
import { useEffect } from 'react'
import { CustomerTokenDocument } from './CustomerToken.gql'

export type UseExtractErrors = { error?: ApolloError }
export function useExtractCustomerErrors({ error }: UseExtractErrors) {
  const client = useApolloClient()

  const [newError, unauthorized] = graphqlErrorByCategory({
    category: 'graphql-authorization',
    error,
    extract: false,
    mask: t`You must sign in to continue`,
  })

  useEffect(() => {
    if (!unauthorized) return

    const { customerToken } =
      client.cache.readQuery({
        query: CustomerTokenDocument,
      }) ?? {}

    if (customerToken) {
      // Write arbitrary old token to document
      client.cache.writeQuery({
        query: CustomerTokenDocument,
        data: {
          customerToken: {
            ...customerToken,
            createdAt: new Date('2000').toUTCString(),
            valid: false,
          },
        },
        broadcast: true,
      })
    }
  }, [client.cache, unauthorized])

  return { error: newError, unauthorized }
}
