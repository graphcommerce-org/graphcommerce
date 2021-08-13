import { useMutation } from '@apollo/client'
import { CircularProgress, makeStyles, TextField, Theme } from '@material-ui/core'
import {
  useCartQuery,
  ApolloCartErrorAlert,
  useMergeCustomerCart,
} from '@reachdigital/magento-cart'
import {
  SignInFormInline,
  SignUpFormInline,
  useFormIsEmailAvailable,
} from '@reachdigital/magento-customer'
import { AnimatedRow, Button, FormDiv, FormRow } from '@reachdigital/next-ui'
import { emailPattern, useFormCompose, UseFormComposeOptions } from '@reachdigital/react-hook-form'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import EmailHelperList from '../EmailHelperList'
import { CartEmailDocument } from './CartEmail.gql'
import { SetGuestEmailOnCartDocument } from './SetGuestEmailOnCart.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    helperList: {
      marginBottom: 0,
    },
  }),
  { name: 'EmailForm' },
)

export type EmailFormProps = Pick<UseFormComposeOptions, 'step'>

export default function EmailForm(props: EmailFormProps) {
  const { step } = props
  const classes = useStyles()
  const [expand, setExpand] = useState(false)

  useMergeCustomerCart()

  const [setGuestEmailOnCart] = useMutation(SetGuestEmailOnCartDocument)
  const { data: cartData } = useCartQuery(CartEmailDocument)
  const { mode, form, submit } = useFormIsEmailAvailable({ email: cartData?.cart?.email })

  const { formState, muiRegister, required, watch, error, getValues } = form

  useFormCompose({ form, step, submit, key: 'EmailForm' })

  useEffect(() => {
    if (!cartData?.cart?.id) return

    // Customer isn't logged in, but we do have a valid email
    if (mode === 'signin' || mode === 'signup') {
      const [email] = getValues(['email'])

      if (cartData.cart.email === email) return
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      setGuestEmailOnCart({ variables: { email, cartId: cartData.cart.id } })
    }
  }, [mode, getValues, cartData?.cart?.id, setGuestEmailOnCart, cartData?.cart?.email])

  let endAdornment: React.ReactNode = null

  if (mode === 'signin') {
    endAdornment = (
      <Button color='secondary' style={{ whiteSpace: 'nowrap' }} onClick={() => setExpand(!expand)}>
        {expand ? 'Close' : 'Sign In'}
      </Button>
    )
  }
  if (mode === 'signup') {
    endAdornment = (
      <Button color='secondary' style={{ whiteSpace: 'nowrap' }} onClick={() => setExpand(!expand)}>
        {expand ? 'Close' : 'Sign Up'}
      </Button>
    )
  }
  if (formState.isSubmitting) endAdornment = <CircularProgress />

  return (
    <FormDiv contained>
      <AnimatePresence initial={false}>
        <AnimatedRow key='emailform'>
          <form noValidate onSubmit={submit}>
            <FormRow>
              <TextField
                variant='outlined'
                type='email'
                error={formState.isSubmitted && !!formState.errors.email}
                helperText={formState.isSubmitted && formState.errors.email?.message}
                label='Email'
                required={required.email}
                {...muiRegister('email', {
                  required: required.email,
                  pattern: { value: emailPattern, message: '' },
                })}
                InputProps={{
                  autoComplete: 'email',
                  endAdornment,
                  readOnly: mode === 'signedin',
                }}
              />
            </FormRow>
            <ApolloCartErrorAlert error={error} />
          </form>
        </AnimatedRow>

        {mode === 'signin' && expand && (
          <AnimatedRow key='signin-form-inline'>
            <SignInFormInline email={watch('email')} />
          </AnimatedRow>
        )}

        {mode === 'signup' && expand && (
          <AnimatedRow key='inline-signup'>
            <SignUpFormInline
              helperList={
                <EmailHelperList key='signup-helper-list' classes={{ root: classes.helperList }} />
              }
              key='signup-form-inline'
              email={watch('email')}
            />
          </AnimatedRow>
        )}

        {((mode !== 'signup' && expand) || !expand) && (
          <AnimatedRow key='email-helperlist'>
            <EmailHelperList />
          </AnimatedRow>
        )}
      </AnimatePresence>
    </FormDiv>
  )
}
