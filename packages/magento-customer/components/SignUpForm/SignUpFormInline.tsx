import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Button, extendableComponent, Form, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Alert, Box, TextField } from '@mui/material'
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

const requireEmailValidation = process.env.BUILD_FLAG_CUSTOMER_REQUIRE_EMAIL_CONFIRMATION === '1'

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
  >(Mutation, {
    // todo(paales): This causes dirty data to be send to the backend.
    defaultValues: {
      email,
      prefix: '-',
      firstname: firstname ?? '-',
      lastname: lastname ?? '-',
    },
    onBeforeSubmit: (values) => ({ ...values, email }),
  })

  const { muiRegister, watch, handleSubmit, required, formState, error } = form
  const submitHandler = handleSubmit(onSubmitted)
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
      <FormRow key='inline-signup' className={classes.row} sx={{ padding: 0 }}>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.password || !!error?.message}
          label={<Trans id='Password' />}
          autoFocus
          autoComplete='new-password'
          id='new-password'
          required={required.password}
          {...muiRegister('password', {
            required: required.password,
            minLength: {
              value: minPasswordLength,
              message: i18n._(/* i18n */ 'Password must have at least 8 characters'),
            },
          })}
          helperText={error?.message}
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.confirmPassword || !!error?.message}
          label={<Trans id='Confirm password' />}
          autoComplete='new-password'
          required
          {...muiRegister('confirmPassword', {
            required: true,
            validate: (value) => value === watchPassword,
          })}
          helperText={!!formState.errors.confirmPassword && <Trans id='Passwords should match' />}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <FormRow key='signup-submit'>
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
    </Form>
  )
}
