import {
  Form,
  FormActions,
  FormDivider,
  MessageSnackbar,
  Button,
  FormLayout,
  UseFormLayoutProps,
} from '@graphcommerce/next-ui'
import { UseFormGqlMutationReturn, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { NameFields } from '../NameFields/NameFields'
import { UpdateCustomerNameDocument, UpdateCustomerNameMutation } from './UpdateCustomerName.gql'

type ChangeNameFormProps = {
  prefix?: string
  firstname: string
  lastname: string
} & UseFormLayoutProps<
  UseFormGqlMutationReturn<
    UpdateCustomerNameMutation,
    {
      prefix: string
      firstname: string
      lastname: string
    }
  >
>

export function ChangeNameForm(props: ChangeNameFormProps) {
  const { prefix, firstname, lastname, children } = props
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
        <FormLayout form={form} original={<NameFields form={form} prefix />}>
          {children}
        </FormLayout>
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
      <MessageSnackbar open={formState.isSubmitSuccessful && !error} variant='pill'>
        <Trans id='Successfully saved changes' />
      </MessageSnackbar>
    </>
  )
}
