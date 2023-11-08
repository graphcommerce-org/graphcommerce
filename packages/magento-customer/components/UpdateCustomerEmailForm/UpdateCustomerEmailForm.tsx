import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import {
  Button,
  Form,
  FormActions,
  FormDivider,
  FormRow,
  MessageSnackbar,
} from '@graphcommerce/next-ui'
import { FormProvider, emailPattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { PropsWithChildren } from 'react'
import { ApolloCustomerErrorSnackbar } from '../ApolloCustomerError'
import { PasswordField } from '../CustomerFields/PasswordField'
import {
  UpdateCustomerEmailDocument,
  UpdateCustomerEmailMutation,
  UpdateCustomerEmailMutationVariables,
} from './UpdateCustomerEmail.gql'

type UpdateCustomerEmailFormProps = PropsWithChildren<{
  email: string
}>

export function UpdateCustomerEmailForm(props: UpdateCustomerEmailFormProps) {
  const { email, children } = props

  const form = useFormGqlMutation<
    UpdateCustomerEmailMutation,
    UpdateCustomerEmailMutationVariables & { currentEmail?: string; confirmEmail?: string }
  >(
    UpdateCustomerEmailDocument,
    {},
    {
      errorPolicy: 'all',
    },
  )

  const { handleSubmit, error, formState, reset, control } = form
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
            <FormRow>
              <TextFieldElement
                key='current-email'
                variant='outlined'
                type='text'
                autoComplete='email'
                autoFocus
                error={formState.isSubmitted && !!formState.errors.currentEmail}
                helperText={formState.isSubmitted && formState.errors.currentEmail?.message}
                label={<Trans id='Current email' />}
                required
                value={email}
                InputProps={{
                  readOnly: true,
                }}
                control={control}
                name='currentEmail'
                validation={{
                  pattern: { value: emailPattern, message: '' },
                }}
              />
            </FormRow>

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
