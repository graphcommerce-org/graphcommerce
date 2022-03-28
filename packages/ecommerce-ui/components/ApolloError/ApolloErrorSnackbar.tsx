import { ApolloError } from '@graphcommerce/graphql'
import { ErrorSnackbar, ErrorSnackbarProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button } from '@mui/material'

export type ApolloErrorSnackbarProps = {
  error?: ApolloError
} & Pick<ErrorSnackbarProps, 'action' | 'onClose'>

export function ApolloErrorSnackbar(props: ApolloErrorSnackbarProps) {
  const { error, action, ...passedProps } = props

  if (!error) return null

  return (
    <ErrorSnackbar
      variant='pill'
      severity='error'
      {...passedProps}
      open={!!error}
      action={
        action ?? (
          <Button size='medium' variant='pill' color='secondary'>
            <Trans>Ok</Trans>
          </Button>
        )
      }
    >
      <>
        {error.graphQLErrors.map((e) => e.message).join(', ')}
        {error.networkError && <>Network Error: {error.networkError.message}</>}
      </>
    </ErrorSnackbar>
  )
}
