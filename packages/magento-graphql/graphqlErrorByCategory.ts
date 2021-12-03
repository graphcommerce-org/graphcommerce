import { ApolloError } from '@apollo/client'
import type { GraphQLError } from 'graphql'

export type ErrorCategory =
  | 'internal'
  | 'graphql-already-exists'
  | 'graphql-authentication'
  | 'graphql-authorization'
  | 'graphql-input'
  | 'graphql-no-such-entity'

export type GraphQLErrorByCategoryProps = {
  category: ErrorCategory
  error?: ApolloError
  extract?: boolean
  mask?: string
}

/**
 * Extract Magento specific erros from the error object.
 *
 * It recognizes the errors specified here:
 * https://devdocs.magento.com/guides/v2.4/graphql/develop/exceptions.html
 */
export function graphqlErrorByCategory({
  category,
  error,
  extract = true,
  mask,
}: GraphQLErrorByCategoryProps): [ApolloError | undefined, GraphQLError | undefined] {
  if (!error) return [error, undefined]

  const newError = new ApolloError({
    ...error,
    graphQLErrors: error.graphQLErrors.filter(
      (err) => !extract || err?.extensions?.category !== category,
    ),
  })

  const graphqlError = error.graphQLErrors.find((err) => err?.extensions?.category === category)
  if (mask && graphqlError) graphqlError.message = mask

  return newError.graphQLErrors.length === 0 && !newError.networkError
    ? [undefined, graphqlError]
    : [newError, graphqlError]
}
