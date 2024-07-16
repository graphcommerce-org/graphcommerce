import {
  ApolloErrorSnackbar,
  EmailElement,
  TelephoneElement,
  TextFieldElement,
} from '@graphcommerce/ecommerce-ui'
import { Button, Form, FormRow, MessageSnackbar } from '@graphcommerce/next-ui'
import { FormPersist, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { CustomerDocument, CustomerQuery, useCustomerQuery } from '../../hooks'
import { ContactUsDocument } from './ContactUsMutation.gql'

function findTelephone(data: CustomerQuery): string | undefined {
  const { customer } = data
  if (!customer) return undefined

  let telephone = ''

  for (const address of customer.addresses ?? []) {
    // eslint-disable-next-line no-continue
    if (!address?.telephone) continue

    if (!telephone && address?.telephone) {
      telephone = address.telephone
    }

    if (address.default_billing && address.telephone) {
      return address.telephone
    }
    if (address.default_shipping && address.telephone) {
      telephone = address.telephone
      break
    }
  }

  return telephone
}

export function ContactForm() {
  const form = useFormGqlMutation(ContactUsDocument, {
    experimental_useV2: true,
    onComplete: (result) => {
      if (result.errors) return
      form.resetField('input.comment')
    },
  })

  const { control, formState, error, handleSubmit, setValue, getValues } = form

  useCustomerQuery(CustomerDocument, {
    onCompleted: (data) => {
      if (!data.customer) return

      const telephone = findTelephone(data)

      if (!getValues('input.telephone') && telephone) {
        setValue('input.telephone', telephone)
      }

      if (!getValues('input.email') && data.customer?.email) {
        setValue('input.email', data.customer?.email)
      }

      if (!getValues('input.name') && data.customer) {
        setValue(
          'input.name',
          `${data.customer?.firstname ?? ''} ${data.customer?.middlename ?? ''} ${data.customer?.lastname ?? ''}`.replaceAll(
            '  ',
            ' ',
          ),
        )
      }
    },
  })

  const submit = handleSubmit(() => {})

  const submittedWithoutErrors = formState.isSubmitSuccessful && !error

  return (
    <Form noValidate onSubmit={submit}>
      <FormRow>
        <TextFieldElement
          control={control}
          name='input.name'
          label={<Trans>Name</Trans>}
          variant='outlined'
          required
          disabled={formState.isSubmitting}
        />
      </FormRow>
      <FormRow>
        <EmailElement
          control={control}
          name='input.email'
          variant='outlined'
          required
          disabled={formState.isSubmitting}
        />
      </FormRow>
      <FormRow>
        <TelephoneElement
          control={control}
          name='input.telephone'
          variant='outlined'
          disabled={formState.isSubmitting}
        />
      </FormRow>
      <FormRow>
        <TextFieldElement
          control={control}
          name='input.comment'
          label={<Trans>Message</Trans>}
          variant='outlined'
          required
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
        disabled={submittedWithoutErrors}
      >
        <Trans>Submit</Trans>
      </Button>

      <FormPersist form={form} name='ContactUs' />
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
