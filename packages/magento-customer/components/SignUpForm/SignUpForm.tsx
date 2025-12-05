import { FormPersist, PasswordRepeatElement, SwitchElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { AttributesFormAutoLayout, StoreConfigDocument } from '@graphcommerce/magento-store'
import { magentoVersion } from '@graphcommerce/next-config/config'
import { Button, FormActions, FormRow } from '@graphcommerce/next-ui'
import type { UseFormClearErrors, UseFormSetError } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Alert } from '@mui/material'
import { useSignInForm } from '../../hooks/useSignInForm'
import { ApolloCustomerErrorSnackbar } from '../ApolloCustomerError/ApolloCustomerErrorSnackbar'
import { CustomerAttributeField } from '../CustomerForms/CustomerAttributeField'
import { nameFieldset } from '../CustomerForms/nameFieldset'
import { useCustomerCreateForm } from '../CustomerForms/useCustomerCreateForm'
import { NameFields } from '../NameFields/NameFields'
import { ValidatedPasswordElement } from '../ValidatedPasswordElement/ValidatedPasswordElement'

type SignUpFormProps = {
  email?: string
  setError: UseFormSetError<{ email?: string; requestedMode?: 'signin' | 'signup' }>
  clearErrors: UseFormClearErrors<{ email?: string; requestedMode?: 'signin' | 'signup' }>
}

export function SignUpForm(props: SignUpFormProps) {
  const { email, setError, clearErrors } = props

  const storeConfig = useQuery(StoreConfigDocument)

  const signIn = useSignInForm({ email })
  const form = useCustomerCreateForm(
    { exclude: ['email'] },
    {
      onBeforeSubmit: (values) => {
        if (!email) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          setError('email', { message: t`Please enter a valid email address` })
          return false
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        clearErrors()

        values.input.email = email
        return values
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
  const { handleSubmit, formState, error, control, attributes } = form
  const submitHandler = handleSubmit(() => {})

  if (
    storeConfig.data?.storeConfig?.create_account_confirmation &&
    !error &&
    formState.isSubmitSuccessful
  ) {
    return (
      <Alert>
        <Trans>
          Registration successful. Please check your inbox to confirm your email address ({email})
        </Trans>
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
          label={<Trans>Password</Trans>}
          autoFocus={!!email}
          autoComplete='new-password'
          required
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          passwordFieldName='input.password'
          variant='outlined'
          label={<Trans>Confirm password</Trans>}
          autoComplete='new-password'
          required
        />
      </FormRow>

      {magentoVersion < 247 ? (
        <NameFields
          form={form}
          names={{
            firstname: 'input.firstname',
            lastname: 'input.lastname',
            prefix: 'input.prefix',
          }}
        />
      ) : (
        <AttributesFormAutoLayout
          attributes={attributes}
          control={control}
          render={CustomerAttributeField}
          fieldsets={[nameFieldset(attributes)]}
        />
      )}

      <SwitchElement
        control={control}
        name='input.is_subscribed'
        disabled={formState.isSubmitting}
        label={<Trans>Subscribe to newsletter</Trans>}
      />

      <ApolloCustomerErrorSnackbar error={error} />

      <FormActions>
        <Button
          type='submit'
          id='create-account'
          variant='pill'
          color='primary'
          size='large'
          loading={formState.isSubmitting}
        >
          <Trans>Create Account</Trans>
        </Button>
      </FormActions>
      <FormPersist form={form} name='SignUp' exclude={['input.password', 'confirmPassword']} />
    </form>
  )
}
