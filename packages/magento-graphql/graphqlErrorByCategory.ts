import { ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'

export type ErrorCategory =
  | 'graphql-already-exists'
  | 'graphql-authentication'
  | 'graphql-authorization'
  | 'graphql-input'
  | 'graphql-no-such-entity'

/**
 * Extract Magento specific erros from the error object.
 *
 * It recognizes the errors specified here:
 * https://devdocs.magento.com/guides/v2.4/graphql/develop/exceptions.html
 */
export default function graphqlErrorByCategory(
  category: ErrorCategory,
  error?: ApolloError,
): [Pick<ApolloError, 'graphQLErrors' | 'networkError'> | undefined, GraphQLError | undefined] {
  if (!error) return [error, undefined]

  const newError = new ApolloError({
    ...error,
    graphQLErrors: error.graphQLErrors.filter((err) => err?.extensions?.category !== category),
  })

  const graphqlError = error.graphQLErrors.find((err) => err?.extensions?.category === category)

  return newError.graphQLErrors.length === 0 && !newError.networkError
    ? [undefined, graphqlError]
    : [newError, graphqlError]
}
