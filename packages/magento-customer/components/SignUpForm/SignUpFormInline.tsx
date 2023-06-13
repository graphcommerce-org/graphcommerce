import {
  ApolloErrorAlert,
  PasswordElement,
  PasswordRepeatElement,
} from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { Button, extendableComponent, Form, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
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

  const { handleSubmit, formState, control, error, required } = form
  const [remainingError, inputError] = graphqlErrorByCategory({ category: 'graphql-input', error })
  const submitHandler = handleSubmit(() => {})

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
        <PasswordElement
          control={control}
          name='password'
          variant='outlined'
          type='password'
          label={<Trans id='Password' />}
          error={!!inputError}
          required={required.password}
          disabled={formState.isSubmitting}
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          passwordFieldName='password'
          variant='outlined'
          type='password'
          label={<Trans id='Confirm password' />}
          error={!!formState.errors.confirmPassword || !!inputError}
          required
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
      <ApolloErrorAlert error={remainingError} />
    </Form>
  )
}
