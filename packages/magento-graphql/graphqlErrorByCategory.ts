import { ApolloError } from '@graphcommerce/graphql'
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
  extract?: true
  mask?: string
}

export type GraphQLErrorByCategoryPropsNoExtract = Omit<GraphQLErrorByCategoryProps, 'extract'> & {
  extract?: false
}

/**
 * Extract Magento specific errors from the error object.
 *
 * It recognizes the errors specified here:
 * https://devdocs.magento.com/guides/v2.4/graphql/develop/exceptions.html
 */
export function graphqlErrorByCategory(
  props: GraphQLErrorByCategoryPropsNoExtract,
): [ApolloError, GraphQLError | undefined]
export function graphqlErrorByCategory(
  props: GraphQLErrorByCategoryProps,
): [ApolloError | undefined, GraphQLError | undefined]
export function graphqlErrorByCategory(
  props: GraphQLErrorByCategoryProps | GraphQLErrorByCategoryPropsNoExtract,
): [ApolloError | undefined, GraphQLError | undefined] {
  const { category, error, extract = true, mask } = props

  if (!error) return [error, undefined]

  const newError = new ApolloError({
    ...error,
    graphQLErrors: error.graphQLErrors.filter(
      (err) => !extract || err?.extensions?.category !== category,
    ),
  })

  const graphqlError = error.graphQLErrors.find((err) => err?.extensions?.category === category)
  if (mask && graphqlError) {
    graphqlError.message = mask
  }

  return newError.graphQLErrors.length === 0 && !newError.networkError
    ? [undefined, graphqlError]
    : [newError, graphqlError]
}
