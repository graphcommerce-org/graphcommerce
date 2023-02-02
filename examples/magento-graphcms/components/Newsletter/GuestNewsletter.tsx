import {
  ApolloErrorSnackbar,
  TextFieldElement,
  useFormGqlMutation,
} from '@graphcommerce/ecommerce-ui'
import { GuestNewsletterToggleDocument } from '@graphcommerce/magento-newsletter/components/GuestNewsletterToggle/GuestNewsletterToggle.gql'
import { Form, MessageSnackbar, Button } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'

export function GuestNewsletter() {
  const form = useFormGqlMutation(GuestNewsletterToggleDocument, {}, { errorPolicy: 'all' })

  const { handleSubmit, formState, error, control } = form
  const submit = handleSubmit(() => {})

  const submittedWithoutErrors = formState.isSubmitSuccessful && !error

  return (
    <Form noValidate onSubmit={submit} sx={[(theme) => ({ gap: theme.spacings.xs })]}>
      <TextFieldElement
        required
        variant='outlined'
        type='email'
        label={i18n._(/* i18n */ 'Email address')}
        control={control}
        name='email'
        size='medium'
        inputProps={{ autoComplete: 'email' }}
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
        {submittedWithoutErrors ? <Trans id='Subscribed' /> : <Trans id='Subscribe' />}
      </Button>

      <MessageSnackbar
        open={submittedWithoutErrors}
        variant='pill'
        action={
          <Button size='medium' variant='pill' color='secondary' fullWidth>
            <Trans id='Ok' />
          </Button>
        }
      >
        <Trans id='You have been successfully subscribed to our newsletter.' />
      </MessageSnackbar>

      <ApolloErrorSnackbar error={error} />
    </Form>
  )
}
