import { ApolloError } from '@apollo/client'
import { Trans } from '@lingui/macro'
import Button from '../Button'
import MessageSnackbar from '../Snackbar/MessageSnackbar'

export type ApolloErrorSnackbarProps = {
  error?: ApolloError
}

export default function ApolloErrorSnackbar(props: ApolloErrorSnackbarProps) {
  const { error } = props
  return (
    <>
      {error && (
        <MessageSnackbar
          open={!!error}
          variant='pill'
          severity='error'
          action={
            <Button size='medium' variant='pill' color='secondary'>
              <Trans>Ok</Trans>
            </Button>
          }
        >
          <>
            {error.graphQLErrors.map((e) => e.message)}
            {error.networkError && <>Network Error: {error.networkError.message}</>}
          </>
        </MessageSnackbar>
      )}
    </>
  )
}
