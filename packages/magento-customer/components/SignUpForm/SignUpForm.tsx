import { FormPersist, PasswordRepeatElement, SwitchElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { AttributesFormAutoLayout, StoreConfigDocument } from '@graphcommerce/magento-store'
import { Button, FormActions, FormRow } from '@graphcommerce/next-ui'
import type { UseFormClearErrors, UseFormSetError } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react/macro'
import { t } from '@lingui/core/macro'
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
        <Trans id='Registration successful. Please check your inbox to confirm your email address ({email})'>
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
          label={<Trans id='Password'>Password</Trans>}
          autoFocus={!!email}
          autoComplete='new-password'
          required
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          passwordFieldName='input.password'
          variant='outlined'
          label={<Trans id='Confirm password'>Confirm password</Trans>}
          autoComplete='new-password'
          required
        />
      </FormRow>

      {import.meta.graphCommerce.magentoVersion < 247 ? (
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
        label={<Trans id='Subscribe to newsletter'>Subscribe to newsletter</Trans>}
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
          <Trans id='Create Account'>Create Account</Trans>
        </Button>
      </FormActions>
      <FormPersist form={form} name='SignUp' exclude={['input.password', 'confirmPassword']} />
    </form>
  )
}
