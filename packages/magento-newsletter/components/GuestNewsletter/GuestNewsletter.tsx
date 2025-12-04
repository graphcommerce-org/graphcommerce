import { ApolloErrorSnackbar, EmailElement, useFormGqlMutation } from '@graphcommerce/ecommerce-ui'
import { Button, Form, MessageSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { GuestNewsletterToggleDocument } from '../GuestNewsletterToggle/GuestNewsletterToggle.gql'

export type GuestNewsletterProps = {
  sx?: SxProps<Theme>
}

export function GuestNewsletter(props: GuestNewsletterProps) {
  const { sx = [] } = props
  const form = useFormGqlMutation(GuestNewsletterToggleDocument, {}, { errorPolicy: 'all' })

  const { handleSubmit, formState, error, control } = form
  const submit = handleSubmit(() => {})

  const submittedWithoutErrors = formState.isSubmitSuccessful && !error

  return (
    <Form
      noValidate
      onSubmit={submit}
      sx={[(theme) => ({ gap: theme.spacings.xs }), ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <EmailElement
        control={control}
        name='email'
        required
        variant='outlined'
        size='medium'
        disabled={submittedWithoutErrors}
      />

      <Button
        loading={formState.isSubmitting}
        variant='pill'
        color='primary'
        type='submit'
        size='large'
        disabled={submittedWithoutErrors}
      >
        {submittedWithoutErrors ? <Trans>Subscribed</Trans> : <Trans>Subscribe</Trans>}
      </Button>

      <MessageSnackbar
        open={submittedWithoutErrors}
        variant='pill'
        severity='success'
        action={
          <Button size='medium' variant='pill' color='secondary' fullWidth>
            <Trans>Ok</Trans>
          </Button>
        }
      >
        <Trans>You have been successfully subscribed to our newsletter.</Trans>
      </MessageSnackbar>

      <ApolloErrorSnackbar error={error} />
    </Form>
  )
}
