import { useQuery } from '@apollo/client'
import { useCartQuery } from '@graphcommerce/magento-cart'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { UseStyles } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import CustomerNewsletterToggle from '../CustomerNewsletterToggle'
import GuestNewsletterToggle from '../GuestNewsletterToggle'
import { GetCartEmailDocument } from './GetCartEmail.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    signup: {
      background: theme.palette.background.paper,
      display: 'grid',
      alignItems: 'center',
      gridAutoFlow: 'column',
      columnGap: theme.spacings.xxs,
      padding: theme.spacings.sm,
      ...theme.typography.body1,
      marginTop: theme.spacings.sm,
      borderRadius: 4,
      gridTemplateColumns: '1fr',
      gridTemplateAreas: `
        "a"
        "b"
      `,
      justifyItems: 'start',
      [theme.breakpoints.up('sm')]: {
        gridTemplateAreas: `"a b c"`,
        gridTemplateColumns: '2fr 1fr',
      },
    },
    background: {
      background: theme.palette.background.image,
    },
    signupForm: {
      display: 'flex',
      gap: 8,
      justifySelf: 'start',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        justifySelf: 'end',
      },
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
  const { data: cartData } = useCartQuery(GetCartEmailDocument, { allowUrl: true })
  const { data: customerTokenData } = useQuery(CustomerTokenDocument)
  const isCustomer = Boolean(customerTokenData?.customerToken)

  return (
    <div className={clsx(classes.signup, !isCustomer && classes.background)}>
      <Typography variant='subtitle1'>
        <Trans>Sign up for our newsletter and stay updated</Trans>
      </Typography>
      <div className={classes.signupForm}>
        {isCustomer ? (
          <CustomerNewsletterToggle color='primary' />
        ) : (
          <GuestNewsletterToggle color='primary' />
        )}
        {cartData?.cart?.email}
      </div>
    </div>
  )
}
