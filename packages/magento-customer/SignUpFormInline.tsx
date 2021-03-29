import { makeStyles, TextField, Theme } from '@material-ui/core'
import EmailFormHelperList from '@reachdigital/magento-cart/email/EmailFormHelperList'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import clsx from 'clsx'
import { m } from 'framer-motion'
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
    helperList: {
      marginBottom: 0,
    },
  }),
  { name: 'SignUpFormInline' },
)

type SignUpFormInlineProps = Pick<SignUpMutationVariables, 'email'>

export default function SignUpFormInline({ email }: PropsWithChildren<SignUpFormInlineProps>) {
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
  const { register, errors, watch, handleSubmit, required, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate className={clsx(formClasses.form, classes.form)}>
      <AnimatedRow key='inline-signup' className={clsx(formClasses.formRow, classes.row)}>
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
        />
        <TextField
          variant='outlined'
          type='password'
          error={!!(errors as any).confirm_password || !!error?.message}
          id='confirm_password'
          name='confirm_password'
          label='Confirm password'
          required
          inputRef={register({
            required: true,
            validate: (value) => value === watch('password'),
          })}
          helperText={!!(errors as any).confirm_password && 'Passwords should match'}
          disabled={formState.isSubmitting}
        />
      </AnimatedRow>

      <AnimatedRow className={formClasses.formRow} key='signup-submit'>
        <div className={clsx(formClasses.formRow, classes.buttonFormRow)}>
          <div>
            <EmailFormHelperList classNames={classes.helperList} />
          </div>
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
      </AnimatedRow>
    </form>
  )
}
