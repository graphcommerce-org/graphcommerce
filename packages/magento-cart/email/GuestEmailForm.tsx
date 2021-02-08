import { useQuery } from '@apollo/client'
import { TextField, makeStyles, Theme, CircularProgress, debounce } from '@material-ui/core'
import { IsEmailAvailableDocument } from '@reachdigital/magento-customer/IsEmailAvailable.gql'
import useFormGqlMutation from '@reachdigital/next-ui/Form/useFormGqlMutation'
import { emailPattern } from '@reachdigital/next-ui/Form/validationPatterns'
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
  const { data: cartQuery } = useQuery(ClientCartDocument)

  const form = useFormGqlMutation(SetGuestEmailOnCartDocument, {
    mode: 'onBlur',
    defaultValues: {
      cartId: cartQuery?.cart?.id,
      email: cartQuery?.cart?.email ?? '',
    },
  })
  const { register, errors, handleSubmit, required, watch, formState } = form

  const isValidEmail = !!emailPattern.exec(watch('email'))
  const { data: emailQuery, loading: emailLoading } = useQuery(IsEmailAvailableDocument, {
    skip: !isValidEmail,
    variables: { email: watch('email') ?? '' },
    fetchPolicy: 'cache-first',
  })

  useEffect(() => {
    // Solves positioning issues with password managers
    if (isValidEmail) window.dispatchEvent(new Event('resize'))
  }, [isValidEmail])

  const isLoading = emailLoading
  const hasAccount = isValidEmail && emailQuery?.isEmailAvailable?.is_email_available === false
  const canSubmit = isValidEmail && cartQuery?.cart?.email !== watch('email')

  let endAdornment: React.ReactNode = null
  if (isValidEmail) endAdornment = signUpAdornment
  if (hasAccount) endAdornment = signInAdornment
  if (isLoading) endAdornment = <CircularProgress />

  return (
    <form
      noValidate
      {...(canSubmit && { onChange: debounce(() => handleSubmit(() => {})(), 500) })}
      className={classes.form}
    >
      <TextField
        variant='outlined'
        type='text'
        error={formState.isSubmitted && !!errors.email}
        id='email'
        name='email'
        label='Email'
        inputRef={register({
          required: required.email,
          pattern: { value: emailPattern, message: 'Invalid email address' },
        })}
        helperText={formState.isSubmitted && errors.email?.message}
        // disabled={loading}
        autoComplete='off'
        InputProps={{ endAdornment }}
      />
    </form>
  )
}
