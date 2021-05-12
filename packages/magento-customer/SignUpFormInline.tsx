import { makeStyles, TextField, Theme } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from './SignUp.gql'
import onCompleteSignInUp from './onCompleteSignInUp'

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
  helperList: React.ReactNode
}

export default function SignUpFormInline({
  email,
  helperList,
}: PropsWithChildren<SignUpFormInlineProps>) {
  const classes = useStyles()
  const formClasses = useFormStyles()
  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(SignUpDocument, {
    // todo(paales): This causes dirty data to be send to the backend.
    defaultValues: { email, prefix: '-', firstname: '-', lastname: '-' },
    onComplete: onCompleteSignInUp,
  })
  const { muiRegister, watch, handleSubmit, required, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate className={clsx(formClasses.form, classes.form)}>
      <div key='inline-signup' className={clsx(formClasses.formRow, classes.row)}>
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
            validate: (value) => value === watch('password'),
          })}
          helperText={!!formState.errors.confirmPassword && 'Passwords should match'}
          disabled={formState.isSubmitting}
        />
      </div>

      <div className={formClasses.formRow} key='signup-submit'>
        <div className={clsx(formClasses.formRow, classes.buttonFormRow)}>
          <div>{helperList}</div>
          <div className={classes.buttonContainer}>
            <Button
              fullWidth
              type='submit'
              loading={formState.isSubmitting}
              color='secondary'
              variant='pill'
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
