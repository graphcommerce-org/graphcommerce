import type { ApolloError } from '@graphcommerce/graphql'
import type { ErrorSnackbarProps } from '@graphcommerce/next-ui'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { maskNetworkError } from './maskNetworkError'

export type ApolloErrorSnackbarProps = {
  error?: ApolloError
} & Pick<ErrorSnackbarProps, 'action' | 'onClose'>

export function ApolloErrorSnackbar(props: ApolloErrorSnackbarProps) {
  const { error, action, ...passedProps } = props

  if (!error) return null

  return (
    <ErrorSnackbar variant='pill' severity='error' {...passedProps} open={!!error}>
      <>
        {error.graphQLErrors.map((e) => e.message).join(', ')}
        {maskNetworkError(error.networkError)}
      </>
    </ErrorSnackbar>
  )
}
