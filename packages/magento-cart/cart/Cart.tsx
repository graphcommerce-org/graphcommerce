import { Divider, makeStyles, NoSsr, Theme } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CartIcon from '@material-ui/icons/ShoppingBasketOutlined'
import Money from '@reachdigital/magento-store/Money'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import { AnimatePresence, m, MotionProps } from 'framer-motion'
import React from 'react'
import { ClientCartQuery } from '../ClientCart.gql'
import CheckoutStepper from './CheckoutStepper'
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
      textAlign: 'center',
      color: theme.palette.primary.mutedText,
      margin: `${theme.spacings.lg} auto`,
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
  clientCartQueryData: ClientCartQuery
  renderer: CartItemRenderer
}

export default function Cart(props: CartProps) {
  const { renderer, clientCartQueryData } = props
  const classes = useStyles()

  const hasItems = !!clientCartQueryData?.cart?.items?.length
  const { cart } = clientCartQueryData

  return (
    <NoSsr>
      <CheckoutStepper steps={3} currentStep={0} key='checkout-stepper' />

      <AnimatePresence initial={false}>
        {!hasItems && (
          <AnimatedRow className={clsx(classes.emptyCart)} key='empty-cart'>
            <CartIcon className={classes.emptyCartIcon} color='disabled' />
            <p>Looks like you did not add anything to your cart yet.</p>
          </AnimatedRow>
        )}

        {hasItems && (
          <AnimatedRow key='quick-checkout'>
            <QuickCheckout total={clientCartQueryData?.cart?.prices?.grand_total} />
          </AnimatedRow>
        )}

        {cart?.items?.map(
          (item) =>
            item && (
              <AnimatedRow key={`item-${item.id}`}>
                <RenderType renderer={renderer} {...item} cartId={cart.id} />
              </AnimatedRow>
            ),
        )}

        {hasItems && (
          <AnimatedRow className={classes.costsContainer} key='total-costs'>
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

            <Divider key='divider' />

            {cart?.prices?.grand_total && (
              <div className={clsx(classes.costsRow, classes.costsGrandTotal)}>
                <div>Total (incl. VAT)</div>
                <div>
                  <Money {...cart.prices.grand_total} />
                </div>
              </div>
            )}
          </AnimatedRow>
        )}

        {hasItems && (
          <AnimatedRow className={classes.checkoutButtonContainer} key='checkout-button'>
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
          </AnimatedRow>
        )}
      </AnimatePresence>
    </NoSsr>
  )
}
