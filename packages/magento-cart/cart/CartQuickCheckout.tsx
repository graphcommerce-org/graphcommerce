import { makeStyles, Theme } from '@material-ui/core'
import Money from '@reachdigital/magento-store/Money'
import { MoneyFragment } from '@reachdigital/magento-store/Money.gql'
import Button from '@reachdigital/next-ui/Button'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconChevronRight, iconShoppingBag } from '@reachdigital/next-ui/icons'
import PageLink from 'next/link'
import React, { PropsWithChildren } from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      textAlign: 'center',
      marginTop: theme.spacings.md,
    },
    img: {
      display: 'block',
      margin: `0 auto ${theme.spacings.xxs} auto`,
      width: responsiveVal(48, 64),
      height: responsiveVal(48, 64),
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

type CartQuickCheckoutProps = PropsWithChildren<MoneyFragment>

export default function CartQuickCheckout(props: CartQuickCheckoutProps) {
  const classes = useStyles()
  const { value, children, currency } = props

  return (
    <div className={classes.root}>
      <SvgImage
        src={iconShoppingBag}
        size='large'
        loading='eager'
        alt='shopping bag'
        classes={{ root: classes.img }}
      />

      <span className={classes.total}>
        Cart Total: <Money value={value} currency={currency} />
      </span>
      <PageLink href='/checkout' passHref>
        <Button
          variant='pill'
          color='secondary'
          className={classes.button}
          endIcon={<SvgImage src={iconChevronRight} shade='invert' alt='checkout' />}
          disabled={(value ?? 0) === 0}
        >
          <div className={classes.buttonLabel}>Start checkout</div>
        </Button>
      </PageLink>
      {children}
    </div>
  )
}
