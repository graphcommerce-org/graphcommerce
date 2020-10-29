import { useQuery } from '@apollo/client'
import { TextField, makeStyles, Theme, CircularProgress, debounce } from '@material-ui/core'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { IsEmailAvailableDocument } from '@reachdigital/magento-customer/IsEmailAvailable.gql'
import { useMutationForm, emailPattern } from '@reachdigital/next-ui/useMutationForm'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { CartDocument } from '../Cart.gql'
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
  const { data: cartQuery } = useQuery(CartDocument)

  const { register, errors, onSubmit, required, loading, watch, formState } = useMutationForm({
    mutation: SetGuestEmailOnCartDocument,
    mode: 'onBlur',
    values: { cartId: cartQuery?.cart?.id, email: cartQuery?.cart?.email ?? '' },
  })

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
      {...(canSubmit && { onChange: debounce(onSubmit, 500) })}
      className={classes.form}
    >
      <TextField
        variant='outlined'
        type='text'
        error={formState.isSubmitted && !!errors.email}
        id='email'
        name='email'
        label='Email'
        required={required.email}
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
