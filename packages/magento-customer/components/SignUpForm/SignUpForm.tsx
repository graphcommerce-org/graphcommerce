import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Button, FormActions } from '@graphcommerce/next-ui'
import { FormProvider, useFormGqlMutation, useFormPersist } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Alert } from '@mui/material'
import { ApolloCustomerErrorSnackbar } from '../ApolloCustomerError/ApolloCustomerErrorSnackbar'
import { NewsletterField } from '../CustomerFields/NewsletterField'
import { NameFields } from '../NameFields/NameFields'
import { ValidatePasswordFields } from '../ResetPasswordForm/ValidatePasswordFields'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from './SignUp.gql'
import { SignUpConfirmDocument } from './SignUpConfirm.gql'

type SignUpFormProps = { email: string; children?: React.ReactNode }

const requireEmailValidation = import.meta.graphCommerce.customerRequireEmailConfirmation ?? false

export function SignUpForm(props: SignUpFormProps) {
  const { email, children } = props

  const Mutation = requireEmailValidation ? SignUpConfirmDocument : SignUpDocument

  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(
    Mutation,
    {
      defaultValues: { email },
      onBeforeSubmit: (values) => ({ ...values, email }),
      experimental_useV2: true,
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, formState, error } = form
  const [remainingError] = graphqlErrorByCategory({ category: 'graphql-input', error })

  const submitHandler = handleSubmit(() => {})

  useFormPersist({ form, name: 'SignUp', exclude: ['password', 'confirmPassword'] })

  if (requireEmailValidation && form.formState.isSubmitSuccessful) {
    return (
      <Alert>
        <Trans id='Please check your inbox to validate your email ({email})' values={{ email }} />
      </Alert>
    )
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={submitHandler} noValidate>
        {children ?? (
          <>
            <ValidatePasswordFields />
            <NameFields />
            <NewsletterField />

            <ApolloCustomerErrorSnackbar error={remainingError} />

            <FormActions>
              <Button
                type='submit'
                id='create-account'
                variant='pill'
                color='primary'
                size='large'
                loading={formState.isSubmitting}
              >
                <Trans id='Create Account' />
              </Button>
            </FormActions>
          </>
        )}
      </form>
    </FormProvider>
  )
}
