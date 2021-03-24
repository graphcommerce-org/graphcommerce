import { useMutation, useQuery } from '@apollo/client'
import { CircularProgress, makeStyles, TextField, Theme } from '@material-ui/core'
import useFormIsEmailAvailable from '@reachdigital/magento-customer/useFormIsEmailAvailable'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { emailPattern } from '@reachdigital/react-hook-form/validationPatterns'
import React, { PropsWithChildren, useEffect } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { SetGuestEmailOnCartDocument } from './SetGuestEmailOnCart.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      alignItems: 'center',
      gridRowGap: theme.spacings.sm,
      gridColumnGap: theme.spacings.xs,
    },
    actions: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      paddingBottom: theme.spacings.xs,
      '& :last-child': {
        textAlign: 'right',
      },
    },
  }),
  { name: 'GuestOrderEmailSignIn' },
)

type GuestEmailFormProps = {
  signInAdornment?: React.ReactNode
  signUpAdornment?: React.ReactNode
}

export default function GuestEmailForm({
  signInAdornment,
  signUpAdornment,
}: PropsWithChildren<GuestEmailFormProps>) {
  const classes = useStyles()
  const formClasses = useFormStyles()
  const { data: cartQuery } = useQuery(ClientCartDocument)
  // const [execute] = useMutation(SetGuestEmailOnCartDocument)

  const { mode, form, token, autoSubmitting, submit, hasAccount } = useFormIsEmailAvailable({
    email: cartQuery?.cart?.email,
    // onSubmitted: ({ email }) =>
    //   execute({ variables: { email, cartId: cartQuery?.cart?.id ?? '' } }),
  })

  const { formState, errors, register, required, watch, error } = form
  const isValidEmail = !!emailPattern.exec(watch('email'))

  useEffect(() => {
    // Solves positioning issues with password managers
    if (isValidEmail) window.dispatchEvent(new Event('resize'))
  }, [isValidEmail])

  let endAdornment: React.ReactNode = null
  if (mode === 'signup' || (isValidEmail && !hasAccount)) endAdornment = signUpAdornment
  if (mode === 'signin' || (isValidEmail && hasAccount)) endAdornment = signInAdornment
  if (formState.isSubmitting) endAdornment = <CircularProgress />

  return (
    <>
      <div className={formClasses.formRow}>
        <form noValidate onSubmit={submit} className={classes.form}>
          <TextField
            key='email'
            variant='outlined'
            type='text'
            error={formState.isSubmitted && !!errors.email}
            helperText={formState.isSubmitted && errors.email?.message}
            id='email'
            name='email'
            label='Email'
            required={required.email}
            inputRef={register({
              required: required.email,
              pattern: { value: emailPattern, message: '' },
            })}
            InputProps={{
              endAdornment,
              readOnly: !!token?.customerToken || autoSubmitting,
            }}
          />
        </form>
      </div>

      <ApolloErrorAlert error={error} />
    </>
  )
}
