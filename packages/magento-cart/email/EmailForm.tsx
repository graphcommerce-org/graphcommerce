import { useQuery } from '@apollo/client'
import { makeStyles, TextField, Theme } from '@material-ui/core'
import { CustomerDocument } from '@reachdigital/magento-customer/Customer.gql'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { IsEmailAvailableDocument } from '@reachdigital/magento-customer/IsEmailAvailable.gql'
import SignInFormInline from '@reachdigital/magento-customer/SignInFormInline'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import GuestEmailForm from './GuestEmailForm'

const useStyles = makeStyles(
  (theme: Theme) => ({
    changeEmailButton: {
      minWidth: 'max-content',
    },
  }),
  { name: 'EmailForm' },
)

export default function EmailForm() {
  const formClasses = useFormStyles()
  const classes = useStyles()
  const [expand, setExpand] = useState(false)

  const { data: cartData } = useQuery(ClientCartDocument)
  const { data: tokenData } = useQuery(CustomerTokenDocument)
  const { data: emailData } = useQuery(IsEmailAvailableDocument, {
    fetchPolicy: 'cache-only',
    variables: { email: cartData?.cart?.email ?? '' },
  })

  const { data: customerQuery } = useQuery(CustomerDocument, { ssr: false })

  const customer = customerQuery?.customer

  const isCustomer = tokenData?.customerToken
  const isLoggedIn = customer && isCustomer && tokenData?.customerToken?.valid
  const hasAccount = emailData?.isEmailAvailable?.is_email_available === false

  return (
    <div className={clsx(formClasses.form, formClasses.formContained)}>
      <AnimatePresence initial={false} key='GuestAndSignInForm'>
        {isLoggedIn && (
          <AnimatedRow key='signedin-message'>
            <div className={formClasses.formRow}>
              <TextField
                variant='outlined'
                type='text'
                label='Email'
                value={customer?.email}
                disabled
                InputProps={{
                  endAdornment: (
                    <PageLink href='/account/personal'>
                      <Button
                        className={classes.changeEmailButton}
                        color='secondary'
                        variant='text'
                        disableElevation
                      >
                        Change email
                      </Button>
                    </PageLink>
                  ),
                }}
              />
            </div>
          </AnimatedRow>
        )}

        {!isCustomer && (
          <AnimatedRow key='guest-email-form'>
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
              signUpAdornment={
                <Button
                  color='secondary'
                  style={{ whiteSpace: 'nowrap' }}
                  onClick={() => setExpand(!expand)}
                >
                  {expand ? 'Close' : 'Sign Up'}
                </Button>
              }
            />
          </AnimatedRow>
        )}

        {!isCustomer && expand && !hasAccount && <AnimatedRow key='sign-up' />}

        {!isCustomer && expand && hasAccount && (
          <AnimatedRow key='sign-in'>
            <div className={formClasses.formRow}>
              <SignInFormInline email={cartData?.cart?.email ?? ''} />
            </div>
          </AnimatedRow>
        )}

        {!isCustomer && (
          <AnimatedRow key='helper-list'>
            <ul className={formClasses.helperList} key='steps'>
              <li>E-mail address of existing customers will be recognized, sign in is optional.</li>
              <li>Fill in password fields to create an account.</li>
              <li>Leave passwords fields empty to order as guest.</li>
            </ul>
          </AnimatedRow>
        )}
      </AnimatePresence>
    </div>
  )
}
