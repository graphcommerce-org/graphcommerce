import { Form, FormActions, FormDivider, MessageSnackbar, Button } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@graphcommerce/lingui-next'
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
            variant='contained'
            size='large'
            loading={formState.isSubmitting}
          >
            <Trans>Save changes</Trans>
          </Button>
        </FormActions>
        <ApolloCustomerErrorAlert error={error} />
      </Form>
      <MessageSnackbar open={formState.isSubmitSuccessful && !error} variant='pill'>
        <Trans>Successfully saved changes</Trans>
      </MessageSnackbar>
    </>
  )
}
