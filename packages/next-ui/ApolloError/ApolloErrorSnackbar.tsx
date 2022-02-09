import { ApolloError } from '@graphcommerce/graphql'
import { Trans } from '@lingui/macro'
import { Button } from '@mui/material'
import { MessageSnackbar } from '../Snackbar/MessageSnackbar'
import { MessageSnackbarImplProps } from '../Snackbar/MessageSnackbarImpl'

export type ApolloErrorSnackbarProps = {
  error?: ApolloError
} & Pick<MessageSnackbarImplProps, 'action' | 'onClose'>

export default function ApolloErrorSnackbar(props: ApolloErrorSnackbarProps) {
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
