import { Theme, makeStyles } from '@material-ui/core'
import { Money } from '@reachdigital/magento-store'
import {
  Button,
  responsiveVal,
  SvgImage,
  iconChevronRight,
  iconShoppingBag,
} from '@reachdigital/next-ui'
import PageLink from 'next/link'
import React, { PropsWithChildren } from 'react'
import { CartQuickCheckoutFragment } from './CartQuickCheckout.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      textAlign: 'center',
      marginTop: theme.spacings.md,
    },
    img: {
      display: 'block',
      margin: `0 auto ${theme.spacings.xxs} auto`,
      width: responsiveVal(40, 72),
      height: responsiveVal(40, 72),
    },
    total: {
      fontWeight: 700,
      fontFamily: theme.typography.fontFamily,
      fontSize: responsiveVal(18, 25),
      display: 'block',
    },
    button: {
      marginTop: responsiveVal(20, 40),
      borderRadius: responsiveVal(40, 50),
      fontSize: 17,
      fontFamily: theme.typography.fontFamily,
      fontWeight: 500,
      marginBottom: theme.spacings.lg,
      maxHeight: 55,
      paddingTop: responsiveVal(10, 15),
      paddingBottom: responsiveVal(10, 15),
      paddingLeft: responsiveVal(25, 35),
      paddingRight: responsiveVal(26, 30),
    },
    buttonLabel: {
      '& ~ span.MuiButton-endIcon': {
        marginLeft: 6,
      },
    },
  }),
  { name: 'QuickCheckout' },
)

export type CartQuickCheckoutProps = PropsWithChildren<CartQuickCheckoutFragment>

export default function CartQuickCheckout(props: CartQuickCheckoutProps) {
  const classes = useStyles()
  const { children, prices } = props

  return (
    <div className={classes.root}>
      <SvgImage
        src={iconShoppingBag}
        size='extralarge'
        loading='eager'
        alt='shopping bag'
        classes={{ root: classes.img }}
      />

      <span className={classes.total}>
        Cart Total: <Money {...prices?.grand_total} />
      </span>
      {children}
    </div>
  )
}
