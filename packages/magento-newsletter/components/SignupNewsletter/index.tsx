import { useQuery } from '@apollo/client'
import { makeStyles, Theme } from '@material-ui/core'
import { useCartQuery } from '@reachdigital/magento-cart'
import { CartPageDocument } from '@reachdigital/magento-cart-checkout'
import { CustomerTokenDocument } from '@reachdigital/magento-customer'
import { UseStyles } from '@reachdigital/next-ui'
import React from 'react'
import CustomerNewsletterToggle from '../CustomerNewsletterToggle'
import GuestNewsletterToggle from '../GuestNewsletterToggle'

const useStyles = makeStyles(
  (theme: Theme) => ({
    signup: {
      background: theme.palette.background.highlight,
      display: 'grid',
      alignItems: 'center',
      gridAutoFlow: 'column',
      columnGap: theme.spacings.xxs,
      padding: theme.spacings.sm,
      ...theme.typography.body1,
      marginTop: theme.spacings.sm,
      borderRadius: 4,
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: `
        "a a a"
        "b c c"
      `,
      [theme.breakpoints.up('sm')]: {
        gridTemplateAreas: `"a b c"`,
        gridTemplateColumns: '4fr 1fr',
      },
    },
    signupForm: {
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  }),
  {
    name: 'SignupNewsletter',
  },
)

type SignupNewsletterProps = {
  //
} & UseStyles<typeof useStyles>

export default function SignupNewsletter(props: SignupNewsletterProps) {
  const classes = useStyles(props)
  const { data: cartData } = useCartQuery(CartPageDocument, { returnPartialData: true })
  const { data: customerTokenData } = useQuery(CustomerTokenDocument)
  const customerSignedIn = Boolean(
    customerTokenData?.customerToken && customerTokenData?.customerToken.valid,
  )
  const email = cartData?.cart?.email ?? ''

  if (!customerSignedIn && !email) return <></>

  return (
    <div className={classes.signup}>
      <b>Sign up for our newsletter and stay updated</b>
      <div className={classes.signupForm}>
        {customerSignedIn ? (
          <CustomerNewsletterToggle color='primary' />
        ) : (
          <GuestNewsletterToggle color='primary' email={email} />
        )}
        {email}
      </div>
    </div>
  )
}
