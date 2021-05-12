import { useMutation, useQuery } from '@apollo/client'
import { CircularProgress, makeStyles, TextField, Theme } from '@material-ui/core'
import { useCartQuery } from '@reachdigital/magento-cart'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import SignInFormInline from '@reachdigital/magento-customer/SignInFormInline'
import SignUpFormInline from '@reachdigital/magento-customer/SignUpFormInline'
import useFormIsEmailAvailable from '@reachdigital/magento-customer/useFormIsEmailAvailable'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { emailPattern, useFormCompose, UseFormComposeOptions } from '@reachdigital/react-hook-form'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
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

function HelperList(props: { classNames?: string | string[] }) {
  const { classNames } = props
  const { data: tokenData } = useQuery(CustomerTokenDocument)
  const formClasses = useFormStyles()

  return (
    <>
      {!tokenData?.customerToken && (
        <ul className={clsx(formClasses.helperList, classNames)}>
          <li>E-mail address of existing customers will be recognized, sign in is optional.</li>
          <li>Fill in password fields to create an account.</li>
          <li>Leave passwords fields empty to order as guest.</li>
        </ul>
      )}
    </>
  )
}

export type EmailFormProps = Pick<UseFormComposeOptions, 'step'>

export default function EmailForm(props: EmailFormProps) {
  const { step } = props
  const formClasses = useFormStyles()
  const classes = useStyles()

  const [expand, setExpand] = useState(false)

  const { data: cartData } = useCartQuery(CartEmailDocument)
  const [setGuestEmailOnCart] = useMutation(SetGuestEmailOnCartDocument)
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
    <div className={clsx(formClasses.form, formClasses.formContained)}>
      <AnimatePresence initial={false}>
        <AnimatedRow key='emailform'>
          <form noValidate onSubmit={submit}>
            <div className={formClasses.formRow}>
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
                  autoComplete: 'username',
                  endAdornment,
                  readOnly: mode === 'signedin',
                }}
              />
            </div>
            <ApolloErrorAlert error={error} />
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
              helperList={<HelperList key='signup-helper-list' classNames={classes.helperList} />}
              key='signup-form-inline'
              email={watch('email')}
            />
          </AnimatedRow>
        )}

        {((mode !== 'signup' && expand) || !expand) && (
          <AnimatedRow key='email-helperlist'>
            <HelperList />
          </AnimatedRow>
        )}
      </AnimatePresence>
    </div>
  )
}
