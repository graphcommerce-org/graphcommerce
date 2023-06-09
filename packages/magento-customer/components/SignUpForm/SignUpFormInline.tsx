import { ApolloErrorAlert, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Button, extendableComponent, Form, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Alert, Box } from '@mui/material'
import React from 'react'
import { SignUpMutationVariables, SignUpMutation, SignUpDocument } from './SignUp.gql'
import { SignUpConfirmDocument } from './SignUpConfirm.gql'

type SignUpFormInlineProps = Pick<SignUpMutationVariables, 'email'> & {
  children?: React.ReactNode
  firstname?: string
  lastname?: string
  onSubmitted?: () => void
}

const { classes } = extendableComponent('SignUpFormInline', [
  'form',
  'buttonFormRow',
  'row',
  'buttonContainer',
] as const)

const requireEmailValidation = import.meta.graphCommerce.customerRequireEmailConfirmation ?? false

export function SignUpFormInline({
  email,
  children,
  firstname,
  lastname,
  onSubmitted = () => {},
}: SignUpFormInlineProps) {
  const Mutation = requireEmailValidation ? SignUpConfirmDocument : SignUpDocument

  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(
    Mutation,
    {
      // todo(paales): This causes dirty data to be send to the backend.
      defaultValues: {
        email,
        prefix: '-',
        firstname: firstname ?? '-',
        lastname: lastname ?? '-',
      },
      onBeforeSubmit: (values) => ({ ...values, email }),
      onComplete: (result) => {
        if (!result.errors) onSubmitted()
      },
    },
    { errorPolicy: 'all' },
  )

  const { watch, handleSubmit, formState, required, control } = form
  const submitHandler = handleSubmit(() => {})
  const watchPassword = watch('password')

  const minPasswordLength = Number(
    useQuery(StoreConfigDocument).data?.storeConfig?.minimum_password_length ?? 8,
  )

  if (requireEmailValidation && form.formState.isSubmitSuccessful) {
    return (
      <Alert>
        <Trans id='Please check your inbox to validate your email ({email})' values={{ email }} />
      </Alert>
    )
  }

  return (
    <Form onSubmit={submitHandler} noValidate className={classes.form} sx={{ padding: 0 }}>
      <FormRow className={classes.row} sx={{ padding: 0 }}>
        <TextFieldElement
          control={control}
          name='password'
          variant='outlined'
          type='password'
          label={<Trans id='Password' />}
          autoFocus
          autoComplete='new-password'
          id='new-password'
          required={required.password}
          validation={{
            required: required.password,
            minLength: {
              value: minPasswordLength,
              message: i18n._(/* i18n */ 'Password must have at least 8 characters'),
            },
            validate: () => !!formState.errors.password || !!form.error,
          }}
          disabled={formState.isSubmitting}
        />
        <TextFieldElement
          control={control}
          name='confirmPassword'
          variant='outlined'
          type='password'
          label={<Trans id='Confirm password' />}
          autoComplete='new-password'
          required
          validation={{
            required: true,
            validate: (value) =>
              value === watchPassword || i18n._(/* i18n */ "Passwords don't match"),
          }}
          helperText={!!formState.errors.confirmPassword && <Trans id='Passwords should match' />}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <FormRow>
        <FormRow
          className={classes.buttonFormRow}
          sx={(theme) => ({
            padding: 0,
            [theme.breakpoints.up('sm')]: {
              gridTemplateColumns: 'minmax(200px, 3.5fr) 1fr',
            },
          })}
        >
          <div>{children}</div>
          <Box className={classes.buttonContainer} sx={{ alignSelf: 'center' }}>
            <Button
              fullWidth
              type='submit'
              loading={formState.isSubmitting}
              color='secondary'
              variant='pill'
            >
              <Trans id='Create Account' />
            </Button>
          </Box>
        </FormRow>
      </FormRow>
      <ApolloErrorAlert error={form.error} />
    </Form>
  )
}
