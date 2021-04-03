import { makeStyles, TextField, Theme } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import React, { PropsWithChildren } from 'react'
import { SignInDocument, SignInMutationVariables } from './SignIn.gql'
import onCompleteSignInUp from './onCompleteSignInUp'

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      alignItems: 'center',
      gridRowGap: theme.spacings.sm,
      gridColumnGap: theme.spacings.xs,
      gridTemplateColumns: '1fr',
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: '5fr 1fr',
      },
    },
    button: {
      minWidth: 'max-content',
    },
  }),
  { name: 'SignInFormInline' },
)

type InlineSignInFormProps = Omit<SignInMutationVariables, 'password'>

export default function SignInFormInline({ email }: PropsWithChildren<InlineSignInFormProps>) {
  const classes = useStyles()
  const form = useFormGqlMutation(SignInDocument, {
    defaultValues: { email },
    onComplete: onCompleteSignInUp,
  })
  const { muiRegister, handleSubmit, required, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
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
        InputProps={{
          endAdornment: (
            <PageLink href='/account/forgot-password' key='forgot-password'>
              <Button color='secondary' variant='text' className={classes.button}>
                Forgot password?
              </Button>
            </PageLink>
          ),
        }}
      />
      <Button type='submit' loading={formState.isSubmitting} color='secondary' variant='pill'>
        Sign in
      </Button>
    </form>
  )
}
