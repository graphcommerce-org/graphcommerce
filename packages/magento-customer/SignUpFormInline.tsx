import { makeStyles, TextField, Theme } from '@material-ui/core'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import { SignUpDocument, SignUpMutationVariables } from './SignUp.gql'
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
  const form = useFormGqlMutation(SignUpDocument, {
    defaultValues: {
      email,
      prefix: '-',
      firstname: '-',
      lastname: '-',
    },
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
          required={required.password}
          {...muiRegister('password', { required: required.password })}
          helperText={error?.message}
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.confirm_password || !!error?.message}
          label='Confirm password'
          required
          {...muiRegister('confirm_password', {
            required: true,
            validate: (value) => value === watch('password'),
          })}
          helperText={!!formState.errors.confirm_password && 'Passwords should match'}
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
