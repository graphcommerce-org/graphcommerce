import type { ErrorSnackbarProps } from '@graphcommerce/next-ui'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import type { ErrorLike } from '@apollo/client'
import { CombinedGraphQLErrors } from '@apollo/client/errors'
import { maskNetworkError } from './maskNetworkError'

export type ApolloErrorSnackbarProps = {
  error?: ErrorLike | null
} & Pick<ErrorSnackbarProps, 'action' | 'onClose'>

export function ApolloErrorSnackbar(props: ApolloErrorSnackbarProps) {
  const { error, ...passedProps } = props

  if (!error) return null

  // Check if this is a CombinedGraphQLErrors
  const isGraphQLError = CombinedGraphQLErrors.is(error)
  const graphQLErrors = isGraphQLError ? error.errors : []

  return (
    <ErrorSnackbar variant='pill' severity='error' {...passedProps} open={!!error}>
      <>
        {graphQLErrors.map((e) => e.message).join(', ')}
        {!isGraphQLError && maskNetworkError(error)}
      </>
    </ErrorSnackbar>
  )
}
