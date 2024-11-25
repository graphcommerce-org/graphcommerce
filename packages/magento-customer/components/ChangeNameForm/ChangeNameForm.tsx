import { Button, Form, FormActions, FormDivider, MessageSnackbar } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { NameFields } from '../NameFields/NameFields'
import { UpdateCustomerNameDocument } from './UpdateCustomerName.gql'

type ChangeNameFormProps = {
  prefix?: string
  firstname: string
  lastname: string
}

export function ChangeNameForm(props: ChangeNameFormProps) {
  const { prefix, firstname, lastname } = props
  const form = useFormGqlMutation(
    UpdateCustomerNameDocument,
    {
      defaultValues: {
        prefix: prefix ?? '',
        firstname: firstname ?? '',
        lastname: lastname ?? '',
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, error, formState } = form
  const submit = handleSubmit(() => {})

  return (
    <>
      <Form onSubmit={submit} noValidate>
        <NameFields form={form} prefix />
        <FormDivider />
        <FormActions>
          <Button
            type='submit'
            color='primary'
            variant='pill'
            size='large'
            loading={formState.isSubmitting}
          >
            <Trans id='Save changes' />
          </Button>
        </FormActions>
        <ApolloCustomerErrorAlert error={error} />
      </Form>
      <MessageSnackbar
        open={formState.isSubmitSuccessful && !error}
        variant='pill'
        severity='success'
      >
        <Trans id='Successfully saved changes' />
      </MessageSnackbar>
    </>
  )
}
