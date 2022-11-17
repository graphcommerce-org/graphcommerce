import { ApolloError } from '@graphcommerce/graphql'
import { ErrorSnackbar, ErrorSnackbarProps } from '@graphcommerce/next-ui'

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
        {error.networkError && <>Network Error: {error.networkError.message}</>}
      </>
    </ErrorSnackbar>
  )
}
