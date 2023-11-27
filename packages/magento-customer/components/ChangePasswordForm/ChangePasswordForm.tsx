import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Form, FormActions, MessageSnackbar, FormDivider, Button } from '@graphcommerce/next-ui'
import { FormProvider, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { PasswordField } from '../CustomerFields/PasswordField'
import { ValidatePasswordFields } from '../ResetPasswordForm/ValidatePasswordFields'
import {
  ChangePasswordDocument,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from './ChangePassword.gql'

type ChangePasswordFormProps = {
  children?: React.ReactNode
}

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { children } = props
  const form = useFormGqlMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables & { confirmPassword?: string }
  >(ChangePasswordDocument, {}, { errorPolicy: 'all' })
  const { handleSubmit, formState, error } = form
  const [remainingError0] = graphqlErrorByCategory({
    category: 'graphql-authentication',
    error,
  })
  const [remainingError] = graphqlErrorByCategory({
    category: 'graphql-input',
    error: remainingError0,
  })

  const submitHandler = handleSubmit(() => {})

  const showSuccess = !formState.isSubmitting && formState.isSubmitSuccessful && !error?.message

  return (
    <FormProvider {...form}>
      <Form onSubmit={submitHandler} noValidate>
        {children ?? (
          <>
            <PasswordField label={<Trans id='Current Password' />} />
            <ValidatePasswordFields />
            <FormDivider />
            <FormActions>
              <Button
                type='submit'
                loading={formState.isSubmitting}
                color='primary'
                variant='pill'
                size='large'
              >
                <Trans id='Save new password' />
              </Button>
            </FormActions>

            <ApolloErrorSnackbar error={remainingError} />

            {showSuccess && (
              <MessageSnackbar open={showSuccess} sticky variant='pill'>
                <Trans id='Successfully changed password' />
              </MessageSnackbar>
            )}
          </>
        )}
      </Form>
    </FormProvider>
  )
}
