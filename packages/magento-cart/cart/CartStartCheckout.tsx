import { makeStyles, Theme } from '@material-ui/core'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import Money from '@reachdigital/magento-store/Money'
import { MoneyFragment } from '@reachdigital/magento-store/Money.gql'
import Button from '@reachdigital/next-ui/Button'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    checkoutButtonContainer: {
      textAlign: 'center',
    },
    checkoutButton: {
      borderRadius: responsiveVal(40, 50),
      fontSize: 17,
      fontFamily: theme.typography.fontFamily,
      fontWeight: 500,
      marginBottom: theme.spacings.lg,
      marginTop: theme.spacings.lg,
      width: '100%',
      maxHeight: 60,
      maxWidth: 440,
      padding: `${theme.spacings.xs} ${theme.spacings.sm}`,
    },
    checkoutButtonIcon: {
      marginLeft: 0,
    },
    checkoutButtonLabel: {
      fontWeight: theme.typography.fontWeightBold,
      paddingRight: theme.spacings.xxs,
      '& ~ span.MuiButton-endIcon': {
        marginLeft: 6,
      },
    },
  }),
  { name: 'Cart' },
)

type CartStartCheckoutProps = MoneyFragment

export default function CartStartCheckout(props: CartStartCheckoutProps) {
  const classes = useStyles()
  return (
    <div className={classes.checkoutButtonContainer}>
      <PageLink href='/checkout'>
        <Button
          variant='pill'
          color='secondary'
          className={classes.checkoutButton}
          endIcon={
            <PictureResponsiveNext
              alt='desktop_chevron_right_white'
              width={32}
              height={32}
              src='/icons/desktop_chevron_right_white.svg'
              type='image/svg+xml'
            />
          }
        >
          <span className={classes.checkoutButtonLabel}>Start Checkout</span> (
          <Money {...props} />)
        </Button>
      </PageLink>
    </div>
  )
}
