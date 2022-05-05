import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Button, extendableComponent, Form, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { t, Trans } from '@graphcommerce/lingui-next'
import { Box, TextField } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { SignUpMutationVariables, SignUpMutation, SignUpDocument } from './SignUp.gql'

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

export function SignUpFormInline({
  email,
  children,
  firstname,
  lastname,
  onSubmitted = () => {},
}: PropsWithChildren<SignUpFormInlineProps>) {
  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(SignUpDocument, {
    // todo(paales): This causes dirty data to be send to the backend.
    defaultValues: {
      email,
      prefix: '-',
      firstname: firstname ?? '-',
      lastname: lastname ?? '-',
    },
  })
  const { muiRegister, watch, handleSubmit, required, formState, error } = form
  const submitHandler = handleSubmit(onSubmitted)
  const watchPassword = watch('password')

  const minPasswordLength = Number(
    useQuery(StoreConfigDocument).data?.storeConfig?.minimum_password_length ?? 8,
  )

  return (
    <Form onSubmit={submitHandler} noValidate className={classes.form} sx={{ padding: 0 }}>
      <FormRow key='inline-signup' className={classes.row} sx={{ padding: 0 }}>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.password || !!error?.message}
          label={<Trans>Password</Trans>}
          autoFocus
          autoComplete='new-password'
          id='new-password'
          required={required.password}
          {...muiRegister('password', {
            required: required.password,
            minLength: {
              value: minPasswordLength,
              message: t`Password must have at least 8 characters`,
            },
          })}
          helperText={error?.message}
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.confirmPassword || !!error?.message}
          label='Confirm password'
          autoComplete='new-password'
          required
          {...muiRegister('confirmPassword', {
            required: true,
            validate: (value) => value === watchPassword,
          })}
          helperText={!!formState.errors.confirmPassword && 'Passwords should match'}
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
              Create Account
            </Button>
          </Box>
        </FormRow>
      </FormRow>
    </Form>
  )
}
