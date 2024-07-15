import {
  ApolloErrorSnackbar,
  EmailElement,
  TelephoneElement,
  TextFieldElement,
} from '@graphcommerce/ecommerce-ui'
import { Button, Form, FormRow, MessageSnackbar } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { CustomerDocument, useCustomerQuery } from '../../hooks'
import { contactUsDocument } from './contactUs.gql'

export function ContactForm() {
  const customerQuery = useCustomerQuery(CustomerDocument)
  const customer = customerQuery.data?.customer

  const form = useFormGqlMutation(contactUsDocument, {
    defaultValues: {
      email: customer?.email ?? '',
      name: customer
        ? `${customer?.firstname ?? ''} ${customer?.middlename ?? ''} ${customer?.lastname ?? ''}`.replaceAll(
            '  ',
            ' ',
          )
        : '',
    },
  })

  const { control, formState, required, error, handleSubmit } = form

  const submit = handleSubmit(() => {})

  const submittedWithoutErrors = formState.isSubmitSuccessful && !error

  return (
    <Form noValidate onSubmit={submit}>
      <FormRow>
        <TextFieldElement
          control={control}
          name='name'
          label={<Trans>Name</Trans>}
          variant='outlined'
          required={required.name}
          disabled={formState.isSubmitting}
        />
      </FormRow>
      <FormRow>
        <EmailElement
          control={control}
          name='email'
          variant='outlined'
          required={required.email}
          disabled={formState.isSubmitting}
        />
      </FormRow>
      <FormRow>
        <TelephoneElement
          control={control}
          name='telephone'
          variant='outlined'
          required={required.telephone}
          disabled={formState.isSubmitting}
        />
      </FormRow>
      <FormRow>
        <TextFieldElement
          control={control}
          name='comment'
          label={<Trans>Message</Trans>}
          variant='outlined'
          required={required.comment}
          disabled={formState.isSubmitting}
          multiline
          minRows={3}
        />
      </FormRow>
      <Button
        loading={formState.isSubmitting}
        variant='pill'
        color='primary'
        type='submit'
        size='large'
      >
        <Trans>Submit</Trans>
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
        <Trans>Your message has been received, we will contact you as soon as we can</Trans>
      </MessageSnackbar>

      <ApolloErrorSnackbar error={error} />
    </Form>
  )
}
