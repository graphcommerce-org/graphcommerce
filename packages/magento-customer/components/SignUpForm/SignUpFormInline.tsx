import { ApolloErrorAlert, PasswordRepeatElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Button, extendableComponent, Form, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Alert, Box } from '@mui/material'
import React from 'react'
import { useSignInForm } from '../../hooks/useSignInForm'
import { ValidatedPasswordElement } from '../ValidatedPasswordElement/ValidatedPasswordElement'
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

export function SignUpFormInline(props: SignUpFormInlineProps) {
  const { email, children, firstname, lastname, onSubmitted } = props

  const storeConfig = useQuery(StoreConfigDocument)
  const signIn = useSignInForm({ email })
  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(
    SignUpDocument,
    {
      // todo(paales): This causes dirty data to be send to the backend.
      defaultValues: {
        email,
        prefix: '-',
        firstname: firstname ?? '-',
        lastname: lastname ?? '-',
      },
      onBeforeSubmit: (values) => ({ ...values, email }),
      onComplete: async (result, variables) => {
        if (!result.errors && !storeConfig.data?.storeConfig?.create_account_confirmation) {
          signIn.setValue('email', variables.email)
          signIn.setValue('password', variables.password)
          await signIn.handleSubmit(() => {})()
        }
        if (!result.errors) onSubmitted?.()
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, formState, control, error, required } = form
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
    <Form onSubmit={submitHandler} noValidate className={classes.form} sx={{ padding: 0 }}>
      <FormRow className={classes.row} sx={{ padding: 0 }}>
        <ValidatedPasswordElement
          control={control}
          name='password'
          autoComplete='new-password'
          variant='outlined'
          label={<Trans id='Password' />}
          required={required.password}
          disabled={formState.isSubmitting}
          error={!!inputError}
          helperText={inputError?.message}
        />
        <PasswordRepeatElement
          control={control}
          name='confirmPassword'
          passwordFieldName='password'
          autoComplete='new-password'
          variant='outlined'
          label={<Trans id='Confirm password' />}
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
