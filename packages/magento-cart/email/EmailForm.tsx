import { useQuery } from '@apollo/client'
import { Button, Link, makeStyles, Theme } from '@material-ui/core'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { IsEmailAvailableDocument } from '@reachdigital/magento-customer/IsEmailAvailable.gql'
import SignInFormInline from '@reachdigital/magento-customer/SignInFormInline'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import GuestEmailForm from './GuestEmailForm'

const useStyles = makeStyles((theme: Theme) => ({
  forgotPass: {
    color: theme.palette.secondary.main,
  },
}))

export default function EmailForm() {
  const [expand, setExpand] = useState(false)
  const classes = useFormStyles()
  const localClasses = useStyles()
  const { data: cartData } = useQuery(ClientCartDocument)
  const { data: tokenData } = useQuery(CustomerTokenDocument)
  const { data: emailData } = useQuery(IsEmailAvailableDocument, {
    fetchPolicy: 'cache-only',
    variables: { email: cartData?.cart?.email ?? '' },
  })

  const isCustomer = tokenData?.customerToken
  const canSignIn =
    Boolean(tokenData?.customerToken && !tokenData?.customerToken.valid) ||
    emailData?.isEmailAvailable?.is_email_available === false

  if (tokenData?.customerToken?.valid) return null
  return (
    <AnimatedRow className={clsx(classes.form, classes.formContained)}>
      <AnimatePresence initial={false} key='GuestAndSignInForm'>
        {!isCustomer && (
          <AnimatedRow key='guest-email-form'>
            <div className={classes.formRow}>
              <GuestEmailForm
                key='GuestEmailForm'
                signInAdornment={
                  <Button
                    color='secondary'
                    style={{ whiteSpace: 'nowrap' }}
                    onClick={() => setExpand(!expand)}
                  >
                    {expand ? 'Close' : 'Sign In'}
                  </Button>
                }
              />
            </div>
          </AnimatedRow>
        )}
        {!isCustomer && expand && <AnimatedRow key='sign-up' />}
        {canSignIn && expand && (
          <AnimatedRow key='sign-in'>
            <div className={classes.formRow}>
              <SignInFormInline email={cartData?.cart?.email ?? ''} />
            </div>
            <PageLink href='/account/forgot-password' key='forgot-password'>
              <Link className={localClasses.forgotPass}>Forgot password?</Link>
            </PageLink>
          </AnimatedRow>
        )}

        <ul className={classes.steps} key='steps'>
          <li>E-mail address of existing customers will be recognized, sign in is optional.</li>
          <li>Fill in password fields to create an account.</li>
          <li>Leave passwords fields empty to order as guest.</li>
        </ul>
      </AnimatePresence>
    </AnimatedRow>
  )
}
