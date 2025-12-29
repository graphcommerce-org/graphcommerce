import type { ErrorLike } from '@apollo/client'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import type { GraphQLFormattedError } from 'graphql'

export type ErrorCategory =
  | 'internal'
  | 'graphql-already-exists'
  | 'graphql-authentication'
  | 'graphql-authorization'
  | 'graphql-input'
  | 'graphql-no-such-entity'

export type GraphQLErrorByCategoryProps = {
  category: ErrorCategory
  error?: ErrorLike | null
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
): [ErrorLike, GraphQLFormattedError | undefined]
export function graphqlErrorByCategory(
  props: GraphQLErrorByCategoryProps,
): [ErrorLike | undefined, GraphQLFormattedError | undefined]
export function graphqlErrorByCategory(
  props: GraphQLErrorByCategoryProps | GraphQLErrorByCategoryPropsNoExtract,
): [ErrorLike | undefined, GraphQLFormattedError | undefined] {
  const { category, error, extract = true, mask } = props

  if (!error) return [undefined, undefined]

  // Check if this is a CombinedGraphQLErrors
  if (!CombinedGraphQLErrors.is(error)) {
    // Not a GraphQL error, return as-is
    return [error, undefined]
  }

  const filteredErrors = error.errors.filter(
    (err) => !extract || err?.extensions?.category !== category,
  )

  const newError =
    filteredErrors.length > 0 ? new CombinedGraphQLErrors({ errors: filteredErrors }) : undefined

  let graphqlError = error.errors.find((err) => err?.extensions?.category === category)
  if (mask && graphqlError) {
    graphqlError = { ...graphqlError, message: mask }
  }

  return [newError, graphqlError]
}
