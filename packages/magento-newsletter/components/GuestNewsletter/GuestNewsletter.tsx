import { ApolloErrorSnackbar, FormProvider, useFormGqlMutation } from '@graphcommerce/ecommerce-ui'
import { EmailField } from '@graphcommerce/magento-customer/components/CustomerFields/EmailField'
import { Form, MessageSnackbar, Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { PropsWithChildren } from 'react'
import { GuestNewsletterToggleDocument } from '../GuestNewsletterToggle/GuestNewsletterToggle.gql'

type GuestNewsletterProps = PropsWithChildren<{
  sx?: SxProps<Theme>
}>

export function GuestNewsletter(props: GuestNewsletterProps) {
  const { sx = [], children } = props
  const form = useFormGqlMutation(GuestNewsletterToggleDocument, {}, { errorPolicy: 'all' })

  const { handleSubmit, formState, error } = form
  const submit = handleSubmit(() => {})

  const submittedWithoutErrors = formState.isSubmitSuccessful && !error

  return (
    <FormProvider {...form}>
      <Form
        noValidate
        onSubmit={submit}
        sx={[(theme) => ({ gap: theme.spacings.xs }), ...(Array.isArray(sx) ? sx : [sx])]}
      >
        {children ?? (
          <>
            <EmailField />
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
          </>
        )}
      </Form>
    </FormProvider>
  )
}
