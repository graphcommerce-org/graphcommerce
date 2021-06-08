import { useQuery } from '@apollo/client'
import { makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import { AnimatePresence, m } from 'framer-motion'
import React, { useState } from 'react'
import { CustomerTokenDocument } from '..'
import { IsEmailAvailableDocument } from '../IsEmailAvailable.gql'
import SignUpFormInline from '../SignUpFormInline'
import { InlineAccountDocument } from './InlineAccount.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      borderRadius: 4,
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacings.sm,
    },
    innerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    form: {
      marginTop: theme.spacings.sm,
    },
    button: {
      minWidth: 160,
    },
    title: {
      paddingBottom: 8,
    },
  }),
  { name: 'InlineAccount' },
)

type InlineAccountProps = {
  cartId: string
  title?: string
  description?: string
  accountHref: string
  signInHref: string
} & UseStyles<typeof useStyles>

export default function InlineAccount(props: InlineAccountProps) {
  const { cartId, title, description, accountHref, signInHref } = props
  const classes = useStyles(props)

  const [toggled, setToggled] = useState<boolean>(false)

  const { loading, data } = useQuery(InlineAccountDocument, {
    variables: {
      cartId: cartId ?? '',
    },
  })
  const cart = data?.cart

  const { data: customerTokenData } = useQuery(CustomerTokenDocument)
  const { data: isEmailAvailableData } = useQuery(IsEmailAvailableDocument, {
    variables: {
      email: cart?.email ?? '',
    },
  })

  const { firstname, lastname } = cart?.shipping_addresses?.[0] ?? {}
  const signedIn = Boolean(
    customerTokenData?.customerToken && customerTokenData?.customerToken.valid,
  )
  const canSignUp = isEmailAvailableData?.isEmailAvailable?.is_email_available

  return (
    <AnimatePresence>
      <m.div key='signupaccount' className={classes.root}>
        {!signedIn && canSignUp && (
          <>
            <div className={classes.innerContainer}>
              <div>
                <Typography variant='h6' className={classes.title}>
                  {title ?? 'No account yet?'}
                </Typography>
                {description ?? 'You can track your order status and much more!'}
              </div>
              <div>
                {!toggled && (
                  <Button
                    variant='pill'
                    color='secondary'
                    text='bold'
                    loading={loading}
                    onClick={() => setToggled(!toggled)}
                    className={classes.button}
                  >
                    Create an account
                  </Button>
                )}
              </div>
            </div>
            {cart?.email && toggled && (
              <m.div className={classes.form}>
                <FormRow>
                  <TextField
                    variant='outlined'
                    type='email'
                    label='Email'
                    value={cart?.email}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </FormRow>
                <SignUpFormInline
                  firstname={firstname}
                  lastname={lastname}
                  email={cart?.email}
                  onSubmitted={() => setToggled(false)}
                />
              </m.div>
            )}
          </>
        )}

        {signedIn && (
          <div className={classes.innerContainer}>
            <div>
              <Typography variant='h6' className={classes.title}>
                {title ?? 'Have an account?'}
              </Typography>
              {description ?? 'You can find your order history in your account!'}
            </div>
            <div>
              <Button
                variant='pill'
                color='secondary'
                text='bold'
                href={accountHref}
                className={classes.button}
              >
                My account
              </Button>
            </div>
          </div>
        )}

        {!canSignUp && (
          <div className={classes.innerContainer}>
            <div>
              <Typography variant='h6' className={classes.title}>
                {title ?? 'Sign in to your account'}
              </Typography>
              {description ?? 'You can find your order history in your account!'}
            </div>
            <div>
              <Button
                variant='pill'
                color='secondary'
                text='bold'
                href={signInHref}
                className={classes.button}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </m.div>
    </AnimatePresence>
  )
}
