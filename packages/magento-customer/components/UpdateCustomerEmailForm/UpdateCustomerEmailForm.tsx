import { PasswordElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import {
  Button,
  Form,
  FormActions,
  FormDivider,
  FormRow,
  MessageSnackbar,
} from '@graphcommerce/next-ui'
import { emailPattern, useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { ApolloCustomerErrorSnackbar } from '../ApolloCustomerError'
import {
  UpdateCustomerEmailDocument,
  UpdateCustomerEmailMutation,
  UpdateCustomerEmailMutationVariables,
} from './UpdateCustomerEmail.gql'

type UpdateCustomerEmailFormProps = {
  email: string
}

export function UpdateCustomerEmailForm(props: UpdateCustomerEmailFormProps) {
  const { email } = props

  const form = useFormGqlMutation<
    UpdateCustomerEmailMutation,
    UpdateCustomerEmailMutationVariables & { currentEmail?: string; confirmEmail?: string }
  >(
    UpdateCustomerEmailDocument,
    {
      defaultValues: {
        currentEmail: email,
      },
    },
    {
      errorPolicy: 'all',
    },
  )

  const { handleSubmit, error, required, formState, watch, reset, control } = form
  const [remainingError, authenticationError] = graphqlErrorByCategory({
    category: 'graphql-authentication',
    error,
  })
  const submit = handleSubmit(() => {
    reset()
  })
  const watchNewEmail = watch('email')

  return (
    <Form onSubmit={submit} noValidate>
      <FormRow>
        <TextFieldElement
          variant='outlined'
          type='text'
          label={<Trans id='Current email' />}
          required
          name='currentEmail'
          control={control}
          showValid
          InputProps={{ readOnly: true }}
        />
      </FormRow>

      <FormRow>
        <TextFieldElement
          variant='outlined'
          type='text'
          autoComplete='off'
          error={formState.isSubmitted && !!formState.errors.email}
          helperText={formState.isSubmitted && formState.errors.email?.message}
          label={<Trans id='New email' />}
          required={required.email}
          name='email'
          rules={{
            required: true,
            pattern: { value: emailPattern, message: '' },
          }}
          showValid
          control={control}
        />
        <TextFieldElement
          key='confirm-email'
          variant='outlined'
          type='text'
          autoComplete='off'
          error={formState.isSubmitted && !!formState.errors.confirmEmail}
          helperText={formState.isSubmitted && formState.errors.confirmEmail?.message}
          label={<Trans id='Confirm new email' />}
          required
          name='confirmEmail'
          rules={{
            required: true,
            validate: (value) => value === watchNewEmail || i18n._(/* i18n */ "Emails don't match"),
          }}
          showValid
          control={control}
        />
      </FormRow>

      <FormRow>
        <PasswordElement
          control={control}
          variant='outlined'
          name='password'
          label={<Trans id='Password' />}
          autoComplete='current-password'
          required={required.password}
          disabled={formState.isSubmitting}
          error={Boolean(authenticationError)}
          helperText={authenticationError?.message}
        />
      </FormRow>

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

      <MessageSnackbar
        variant='pill'
        severity='success'
        sticky
        open={formState.isSubmitSuccessful && !formState.isSubmitting && !error}
      >
        <Trans id='Successfully updated email' />
      </MessageSnackbar>
    </Form>
  )
}
