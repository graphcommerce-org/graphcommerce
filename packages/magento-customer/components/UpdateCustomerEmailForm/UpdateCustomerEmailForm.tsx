// eslint-disable-next-line @typescript-eslint/no-restricted-imports
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
import { emailPattern, useFormGqlMutation, useWatch } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { ApolloCustomerErrorSnackbar } from '../ApolloCustomerError'
import type {
  UpdateCustomerEmailMutation,
  UpdateCustomerEmailMutationVariables,
} from './UpdateCustomerEmail.gql'
import { UpdateCustomerEmailDocument } from './UpdateCustomerEmail.gql'

export type UpdateCustomerEmailFormProps = {
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

  const { handleSubmit, error, required, formState, reset, control } = form
  const [remainingError, authenticationError] = graphqlErrorByCategory({
    category: 'graphql-authentication',
    error,
  })
  const submit = handleSubmit(() => {
    reset()
  })
  const watchNewEmail = useWatch({ control, name: 'email' })

  return (
    <Form onSubmit={submit} noValidate>
      <FormRow>
        <TextFieldElement
          variant='outlined'
          type='text'
          label={<Trans>Current email</Trans>}
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
          label={<Trans>New email</Trans>}
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
          label={<Trans>Confirm new email</Trans>}
          required
          name='confirmEmail'
          rules={{
            required: true,
            validate: (value) => value === watchNewEmail || t`Emails don't match`,
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
          label={<Trans>Password</Trans>}
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
          <Trans>Save changes</Trans>
        </Button>
      </FormActions>

      <MessageSnackbar
        variant='pill'
        severity='success'
        sticky
        open={formState.isSubmitSuccessful && !formState.isSubmitting && !error}
      >
        <Trans>Successfully updated email</Trans>
      </MessageSnackbar>
    </Form>
  )
}
