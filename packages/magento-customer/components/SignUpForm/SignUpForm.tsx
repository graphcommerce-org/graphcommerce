import { PasswordRepeatElement, SwitchElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { StoreConfigDocument, type CustomAttributesFormValues } from '@graphcommerce/magento-store'
import { Button, FormActions, FormRow } from '@graphcommerce/next-ui'
import type { UseFormClearErrors, UseFormSetError } from '@graphcommerce/react-hook-form'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/macro'
import { Trans } from '@lingui/react'
import { Alert } from '@mui/material'
import { useSignInForm } from '../../hooks/useSignInForm'
import { ApolloCustomerErrorSnackbar } from '../ApolloCustomerError/ApolloCustomerErrorSnackbar'
import { AttributesFormAutoLayout } from '../CustomerAttributesForm/AttributesFormAutoLayout'
import { ValidatedPasswordElement } from '../ValidatedPasswordElement/ValidatedPasswordElement'
import type { SignUpMutation, SignUpMutationVariables } from './SignUp.gql'
import { SignUpDocument } from './SignUp.gql'

type SignUpFormProps = {
  email?: string
  setError: UseFormSetError<{ email?: string; requestedMode?: 'signin' | 'signup' }>
  clearErrors: UseFormClearErrors<{ email?: string; requestedMode?: 'signin' | 'signup' }>
}

type SignUpFormValues = SignUpMutationVariables & {
  confirmPassword?: string
} & CustomAttributesFormValues

export function SignUpForm(props: SignUpFormProps) {
  const { email, setError, clearErrors } = props

  const storeConfig = useQuery(StoreConfigDocument)
  const signIn = useSignInForm({ email })
  const form = useFormGqlMutation<SignUpMutation, SignUpFormValues>(
    SignUpDocument,
    {
      defaultValues: { input: { email } },
      onBeforeSubmit: (values) => {
        if (!email) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          setError('email', { message: t`Please enter a valid email address` })
          return false
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        clearErrors()

        return {
          input: {
            ...values.input,
            email: email ?? '',
            custom_attributes: customerCustomAttributesFormValuesToInput(
              values,
              values.input.custom_attributes,
            ),
          },
        }
      },
      onComplete: async (result, variables) => {
        if (
          !result.errors &&
          !storeConfig.data?.storeConfig?.create_account_confirmation &&
          variables.input.password
        ) {
          signIn.setValue('email', variables.input.email)
          signIn.setValue('password', variables.input.password)
          await signIn.handleSubmit(() => {})()
        }
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, formState, error, control } = form
  const [remainingError, inputError] = graphqlErrorByCategory({ category: 'graphql-input', error })

  const submitHandler = handleSubmit(() => {})

  if (
    storeConfig.data?.storeConfig?.create_account_confirmation &&
    !error &&
    form.formState.isSubmitSuccessful
  ) {
    return (
      <Alert>
        <Trans
          id='Registration successful. Please check your inbox to confirm your email address ({email})'
          values={{ email }}
        />
      </Alert>
    )
  }

  return (
    <form onSubmit={submitHandler} noValidate>
      <FormRow>
        <ValidatedPasswordElement
          control={control}
          name='input.password'
          variant='outlined'
          error={!!formState.errors.input?.password || !!inputError}
          label={<Trans id='Password' />}
          autoFocus={!!email}
          autoComplete='new-password'
          required
          disabled={formState.isSubmitting}
          helperText={inputError?.message}
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          passwordFieldName='input.password'
          variant='outlined'
          error={!!formState.errors.confirmPassword || !!inputError}
          label={<Trans id='Confirm password' />}
          autoComplete='new-password'
          required
          disabled={formState.isSubmitting}
        />
      </FormRow>

      {/* <NameFields form={form} prefix /> */}

      <AttributesFormAutoLayout
        formCode='customer_account_create'
        control={form.control}
        names={{
          custom_attributes: 'custom_attributes',
          email: 'input.email',
          firstname: 'input.firstname',
          lastname: 'input.lastname',
          dob: 'input.date_of_birth',
          gender: 'input.gender',
        }}
        fieldsets={[
          { attributes: ['input.prefix', 'input.gender'] },
          { attributes: ['input.firstname', 'input.middlename', 'input.lastname', 'input.suffix'] },
        ]}
        exclude={['input.email']}
      />

      <SwitchElement
        control={control}
        name='input.is_subscribed'
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
      {/* <FormPersist<SignUpFormValues>
        form={form}
        name='SignUp'
        exclude={['input.password', 'confirmPassword']}
      /> */}
    </form>
  )
}
