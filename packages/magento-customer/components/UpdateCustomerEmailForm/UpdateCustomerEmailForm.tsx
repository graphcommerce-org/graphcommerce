import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Button, Form, FormActions, FormDivider, MessageSnackbar } from '@graphcommerce/next-ui'
import { FormProvider, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { ApolloCustomerErrorSnackbar } from '../ApolloCustomerError'
import { ConfirmEmailField } from '../CustomerFields/ConfirmEmailField'
import { PasswordField } from '../CustomerFields/PasswordField'
import {
  UpdateCustomerEmailDocument,
  UpdateCustomerEmailMutation,
  UpdateCustomerEmailMutationVariables,
} from './UpdateCustomerEmail.gql'

type UpdateCustomerEmailFormProps = {
  email: string
  children?: React.ReactNode
}

export function UpdateCustomerEmailForm(props: UpdateCustomerEmailFormProps) {
  const { email, children } = props

  const form = useFormGqlMutation<
    UpdateCustomerEmailMutation,
    UpdateCustomerEmailMutationVariables & { currentEmail?: string; confirmEmail?: string }
  >(
    UpdateCustomerEmailDocument,
    { defaultValues: { email, currentEmail: email } },
    {
      errorPolicy: 'all',
    },
  )

  const { handleSubmit, error, formState, reset } = form
  const [remainingError] = graphqlErrorByCategory({
    category: 'graphql-authentication',
    error,
  })
  const submit = handleSubmit(() => {
    reset()
  })

  return (
    <FormProvider {...form}>
      <Form onSubmit={submit} noValidate>
        {children ?? (
          <>
            <ConfirmEmailField />
            <PasswordField />

            <ApolloCustomerErrorSnackbar error={remainingError} />

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

            <MessageSnackbar variant='pill' sticky open={formState.isSubmitSuccessful && !error}>
              <Trans id='Successfully updated email' />
            </MessageSnackbar>
          </>
        )}
      </Form>
    </FormProvider>
  )
}
