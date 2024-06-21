import { PasswordRepeatElement, SwitchElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Button, FormActions, FormRow } from '@graphcommerce/next-ui'
import { FormPersist, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Alert } from '@mui/material'
import { useSignInForm } from '../../hooks/useSignInForm'
import { ApolloCustomerErrorSnackbar } from '../ApolloCustomerError/ApolloCustomerErrorSnackbar'
import { NameFields } from '../NameFields/NameFields'
import { ValidatedPasswordElement } from '../ValidatedPasswordElement/ValidatedPasswordElement'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from './SignUp.gql'

type SignUpFormProps = { email: string }

export function SignUpForm(props: SignUpFormProps) {
  const { email } = props

  const storeConfig = useQuery(StoreConfigDocument)
  const signIn = useSignInForm({ email })
  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(
    SignUpDocument,
    {
      defaultValues: { email },
      onBeforeSubmit: (values) => ({ ...values, email }),
      experimental_useV2: true,
      onComplete: async (result, variables) => {
        if (!result.errors && !storeConfig.data?.storeConfig?.create_account_confirmation) {
          signIn.setValue('email', variables.email)
          signIn.setValue('password', variables.password)
          await signIn.handleSubmit(() => {})()
        }
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, required, formState, error, control } = form
  const [remainingError, inputError] = graphqlErrorByCategory({ category: 'graphql-input', error })

  const submitHandler = handleSubmit(() => {})

  if (
    storeConfig.data?.storeConfig?.create_account_confirmation &&
    !error &&
    form.formState.isSubmitSuccessful
  ) {
    return (
      <Alert>
        <Trans id='Please check your inbox to validate your email ({email})' values={{ email }} />
      </Alert>
    )
  }

  return (
    <form onSubmit={submitHandler} noValidate>
      <FormRow>
        <FormPersist form={form} name='SignUp' exclude={['password', 'confirmPassword']} />
        <ValidatedPasswordElement
          control={control}
          name='password'
          variant='outlined'
          error={!!formState.errors.password || !!inputError}
          label={<Trans id='Password' />}
          autoFocus={!!email}
          autoComplete='new-password'
          required={required.password}
          disabled={formState.isSubmitting}
          helperText={inputError?.message}
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          passwordFieldName='password'
          variant='outlined'
          error={!!formState.errors.confirmPassword || !!inputError}
          label={<Trans id='Confirm password' />}
          autoComplete='new-password'
          required
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <NameFields form={form} prefix />

      <SwitchElement
        control={control}
        name='isSubscribed'
        disabled={formState.isSubmitting}
        label={<Trans id='Subscribe to newsletter' />}
      />

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
    </form>
  )
}
