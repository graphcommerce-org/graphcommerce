import { useMutation } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useMergeCustomerCart,
} from '@graphcommerce/magento-cart'
import {
  SignInFormInline,
  SignUpFormInline,
  useFormIsEmailAvailable,
} from '@graphcommerce/magento-customer'
import { AnimatedRow, extendableComponent, FormDiv, FormRow } from '@graphcommerce/next-ui'
import { emailPattern, useFormCompose, UseFormComposeOptions } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import {
  CircularProgress,
  TextField,
  Typography,
  Alert,
  Button,
  SxProps,
  Theme,
} from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { CartEmailDocument } from './CartEmail.gql'
import { SetGuestEmailOnCartDocument } from './SetGuestEmailOnCart.gql'

export type EmailFormProps = Pick<UseFormComposeOptions, 'step'> & {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}

const name = 'EmailForm' as const
const parts = ['root', 'formRow'] as const
const { classes } = extendableComponent(name, parts)

export function EmailForm(props: EmailFormProps) {
  const { step, children, sx } = props
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
        {expand ? <Trans id='Close' /> : <Trans id='Sign in' />}
      </Button>
    )
  }
  if (mode === 'signup') {
    endAdornment = (
      <Button color='secondary' style={{ whiteSpace: 'nowrap' }} onClick={() => setExpand(!expand)}>
        {expand ? <Trans id='Close' /> : <Trans id='Create Account' />}
      </Button>
    )
  }
  if (formState.isSubmitting) endAdornment = <CircularProgress />

  return (
    <FormDiv contained background='default' className={classes.root} sx={sx}>
      <AnimatePresence initial={false}>
        <AnimatedRow key='emailform'>
          <form noValidate onSubmit={submit}>
            <FormRow>
              <Typography variant='h5' component='h2' gutterBottom>
                <Trans id='Log in or create an account' />
              </Typography>
            </FormRow>
            <FormRow className={classes.formRow} sx={{ py: 0 }}>
              <TextField
                variant='outlined'
                type='email'
                error={formState.isSubmitted && !!formState.errors.email}
                helperText={formState.isSubmitted && formState.errors.email?.message}
                label={<Trans id='Email' />}
                required={required.email}
                {...muiRegister('email', {
                  required: required.email,
                  pattern: { value: emailPattern, message: '' },
                })}
                InputProps={{
                  autoComplete: 'email',
                  endAdornment,
                  readOnly: mode === 'signedin' || mode === 'session-expired',
                }}
              />
            </FormRow>
            <ApolloCartErrorAlert error={error} />
          </form>
        </AnimatedRow>

        {((mode === 'signin' && expand) || mode === 'session-expired') && (
          <AnimatedRow key='signin-form-inline'>
            <FormRow>
              <SignInFormInline email={watch('email')} />
            </FormRow>
          </AnimatedRow>
        )}

        {mode === 'signup' && expand && (
          <AnimatedRow key='inline-signup'>
            <SignUpFormInline key='signup-form-inline' email={watch('email')}>
              {children}
            </SignUpFormInline>
          </AnimatedRow>
        )}

        {mode === 'session-expired' && (
          <FormRow>
            <Alert severity='error'>
              <Trans id='You must sign in to continue' />
            </Alert>
          </FormRow>
        )}
        {children && mode !== 'session-expired' && ((mode !== 'signup' && expand) || !expand) && (
          <AnimatedRow key='email-helperlist'>{children}</AnimatedRow>
        )}
      </AnimatePresence>
    </FormDiv>
  )
}
