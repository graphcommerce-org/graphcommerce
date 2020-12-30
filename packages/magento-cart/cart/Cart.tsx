import { Divider, makeStyles, NoSsr, Theme } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CartIcon from '@material-ui/icons/ShoppingBasketOutlined'
import Money from '@reachdigital/magento-store/Money'
import Button from '@reachdigital/next-ui/Button'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import { AnimatePresence, m, MotionProps } from 'framer-motion'
import React from 'react'
import { ClientCartQuery } from '../ClientCart.gql'
import QuickCheckout from './QuickCheckout'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    buttonContainer: {
      position: 'sticky',
      bottom: 8,
    },
    button: {
      width: '100%',
    },
    emptyCart: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.primary.mutedText,
    },
    emptyCartIcon: {
      fontSize: 200,
    },
    costsContainer: {
      background: '#FFFADD',
      paddingTop: theme.spacings.xs,
      paddingBottom: theme.spacings.xs,
      paddingLeft: theme.spacings.sm,
      paddingRight: theme.spacings.sm,
      marginTop: theme.spacings.lg,
    },
    costsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacings.xxs,
      fontSize: 17,
    },
    costsGrandTotal: {
      marginTop: theme.spacings.xxs,
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
    },
    checkoutButton: {
      borderRadius: responsiveVal(40, 50),
      fontSize: 17,
      fontFamily: theme.typography.fontFamily,
      fontWeight: 500,
      marginBottom: theme.spacings.lg,
      marginTop: theme.spacings.lg,
      width: '100%',
      maxWidth: 380,
      padding: `${theme.spacings.xs} ${theme.spacings.sm}`,
    },
    checkoutButtonIcon: {
      '& > svg': {
        fontSize: responsiveVal(24, 30),
        fontWeight: 100,
      },
    },
    checkoutButtonContainer: {
      textAlign: 'center',
    },
    checkoutButtonLabel: {
      fontWeight: theme.typography.fontWeightBold,
      paddingRight: theme.spacings.xxs,
    },
  }),
  { name: 'Cart' },
)

type CartItemRenderer = TypeRenderer<
  NonNullable<NonNullable<NonNullable<ClientCartQuery['cart']>['items']>[0]> & { cartId: string }
>

type CartProps = {
  clientCartQueryData: ClientCartQuery | undefined
  renderer: CartItemRenderer
}

export default function Cart(props: CartProps) {
  const { renderer, clientCartQueryData } = props
  const classes = useStyles()

  let content

  const cartItemAnimation: MotionProps = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { x: -100 },
    layout: true,
  }

  const animation: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { type: 'inertia' } },
    layout: true,
  }

  if (!clientCartQueryData?.cart?.items?.length) {
    content = (
      <m.div
        className={clsx(classes.emptyCart)}
        key='empty-cart'
        {...{ ...animation, layout: false }}
      >
        <CartIcon className={classes.emptyCartIcon} color='disabled' />
        <p>Looks like you did not add anything to your cart yet.</p>
      </m.div>
    )
  } else if (clientCartQueryData) {
    const { cart } = clientCartQueryData

    content = (
      <>
        {cart?.items?.map((item) => {
          if (!item) return null
          return (
            <m.div key={`item${item.id}`} {...cartItemAnimation}>
              <RenderType renderer={renderer} {...item} cartId={cart.id} />
            </m.div>
          )
        })}

        <m.div className={classes.costsContainer} {...animation} key='total-costs'>
          {cart?.prices?.subtotal_including_tax && (
            <div className={classes.costsRow}>
              <div>Products</div>
              <div>
                <Money {...cart.prices.subtotal_including_tax} />
              </div>
            </div>
          )}

          {cart?.prices?.discounts?.map((discount, idx) => (
            <div className={classes.costsRow} key={`discount-${idx}`}>
              <div>{discount?.label}</div>
              <div>
                {discount?.amount && (
                  <Money
                    currency={discount?.amount.currency}
                    value={(discount?.amount.value ?? 0) * -1}
                  />
                )}
              </div>
            </div>
          ))}

          <Divider />

          {cart?.prices?.grand_total && (
            <div className={clsx(classes.costsRow, classes.costsGrandTotal)}>
              <div>Total (incl. VAT)</div>
              <div>
                <Money {...cart.prices.grand_total} />
              </div>
            </div>
          )}
        </m.div>

        <div className={classes.checkoutButtonContainer}>
          {clientCartQueryData?.cart?.items?.length && (
            <>
              <PageLink href='/checkout'>
                <Button
                  variant='pill'
                  color='secondary'
                  className={classes.checkoutButton}
                  endIcon={<ChevronRightIcon className={classes.checkoutButtonIcon} />}
                >
                  <span className={classes.checkoutButtonLabel}>Start checkout</span> (
                  <Money {...clientCartQueryData?.cart?.prices?.grand_total} />)
                </Button>
              </PageLink>
            </>
          )}
        </div>
      </>
    )
  }

  return (
    <NoSsr>
      <AnimatePresence exitBeforeEnter>
        {clientCartQueryData?.cart?.items?.length && (
          <QuickCheckout total={clientCartQueryData?.cart?.prices?.grand_total} />
        )}

        {content}
      </AnimatePresence>
    </NoSsr>
  )
}
