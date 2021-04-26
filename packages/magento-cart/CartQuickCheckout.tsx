import { Theme, makeStyles } from '@material-ui/core'
import Money from '@reachdigital/magento-store/Money'
import { MoneyFragment } from '@reachdigital/magento-store/Money.gql'
import Button from '@reachdigital/next-ui/Button'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
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
    icon: {
      marginLeft: 0,
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
      <img
        src='/icons/desktop_shopping_bag.svg'
        alt='shopping bag'
        className={classes.img}
        width={64}
        height={64}
        loading='eager'
      />
      <span className={classes.total}>
        Cart Total: <Money value={value} currency={currency} />
      </span>
      <PageLink href='/checkout' passHref>
        <Button
          variant='pill'
          color='secondary'
          className={classes.button}
          endIcon={
            <PictureResponsiveNext
              className={classes.icon}
              alt=''
              width={32}
              height={32}
              src='/icons/desktop_chevron_right_white.svg'
              type='image/svg+xml'
            />
          }
          disabled={(value ?? 0) === 0}
        >
          <div className={classes.buttonLabel}>Start checkout</div>
        </Button>
      </PageLink>
      {children}
    </div>
  )
}
