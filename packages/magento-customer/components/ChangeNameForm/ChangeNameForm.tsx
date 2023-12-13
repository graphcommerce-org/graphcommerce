import { Form, FormActions, FormDivider, MessageSnackbar, Button } from '@graphcommerce/next-ui'
import { FormProvider, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import { NameFields } from '../NameFields/NameFields'
import { UpdateCustomerNameDocument } from './UpdateCustomerName.gql'

type ChangeNameFormProps = {
  prefix?: string
  firstname: string
  lastname: string
  children?: React.ReactNode
}

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
    <FormProvider {...form}>
      <Form onSubmit={submit} noValidate>
        {children ?? (
          <>
            <NameFields />
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
            <ApolloCustomerErrorAlert />
            <MessageSnackbar open={formState.isSubmitSuccessful && !error} variant='pill'>
              <Trans id='Successfully saved changes' />
            </MessageSnackbar>
          </>
        )}
      </Form>
    </FormProvider>
  )
}
