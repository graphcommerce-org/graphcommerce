import { useQuery } from '@apollo/client'
import { makeStyles, TextField, Theme } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import React, { PropsWithChildren } from 'react'
import { CustomerTokenDocument } from './CustomerToken.gql'
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
      [theme.breakpoints.up('md')]: {
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
  const { data } = useQuery(CustomerTokenDocument)
  const form = useFormGqlMutation(SignInDocument, {
    defaultValues: { email },
    onComplete: onCompleteSignInUp,
  })
  const { register, errors, handleSubmit, required, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
      <TextField
        variant='outlined'
        type='password'
        error={!!errors.password || !!error?.message}
        id='password'
        name='password'
        label='Password'
        autoFocus
        required={required.password}
        inputRef={register({ required: required.password })}
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
