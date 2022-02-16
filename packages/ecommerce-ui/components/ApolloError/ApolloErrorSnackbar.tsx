import { ApolloError } from '@graphcommerce/graphql'
import { MessageSnackbar } from '@graphcommerce/next-ui/Snackbar/MessageSnackbar'
import { MessageSnackbarImplProps } from '@graphcommerce/next-ui/Snackbar/MessageSnackbarImpl'
import { Trans } from '@lingui/macro'
import { Button } from '@mui/material'

export type ApolloErrorSnackbarProps = {
  error?: ApolloError
} & Pick<MessageSnackbarImplProps, 'action' | 'onClose'>

export function ApolloErrorSnackbar(props: ApolloErrorSnackbarProps) {
  const { error, action, ...passedProps } = props

  if (!error) return null
  return (
    <MessageSnackbar
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
        {error.graphQLErrors.map((e) => e.message)}
        {error.networkError && <>Network Error: {error.networkError.message}</>}
      </>
    </MessageSnackbar>
  )
}
