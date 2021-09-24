import { makeStyles, TextField, Theme } from '@material-ui/core'
import { Button, Form, FormRow } from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import React, { PropsWithChildren } from 'react'
import { SignUpMutationVariables, SignUpMutation, SignUpDocument } from './SignUp.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    buttonFormRow: {
      padding: 0,
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'minmax(200px, 3.5fr) 1fr',
      },
    },
    form: {
      padding: 0,
    },
    row: {
      padding: 0,
    },
    button: {
      minWidth: 'max-content',
    },
    buttonContainer: {
      alignSelf: 'center',
    },
  }),
  { name: 'SignUpFormInline' },
)

type SignUpFormInlineProps = Pick<SignUpMutationVariables, 'email'> & {
  helperList?: React.ReactNode
  firstname?: string
  lastname?: string
  onSubmitted?: () => void
}

export default function SignUpFormInline({
  email,
  helperList,
  firstname,
  lastname,
  onSubmitted = () => {},
}: PropsWithChildren<SignUpFormInlineProps>) {
  const classes = useStyles()
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

  return (
    <Form onSubmit={submitHandler} noValidate classes={{ root: classes.form }}>
      <FormRow key='inline-signup' classes={{ root: classes.row }}>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.password || !!error?.message}
          label='Password'
          autoFocus
          autoComplete='new-password'
          id='new-password'
          required={required.password}
          {...muiRegister('password', { required: required.password })}
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
        <FormRow classes={{ root: classes.buttonFormRow }}>
          <div>{helperList}</div>
          <div className={classes.buttonContainer}>
            <Button
              fullWidth
              type='submit'
              loading={formState.isSubmitting}
              color='secondary'
              variant='pill'
              text='bold'
            >
              Sign up
            </Button>
          </div>
        </FormRow>
      </FormRow>
    </Form>
  )
}
