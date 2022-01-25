import {
  iconShoppingBag,
  responsiveVal,
  StyledBadge,
  SvgImageSimple,
  useScrollY,
  UseStyles,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { alpha, Fab, FabProps, makeStyles, NoSsr, Theme, useTheme } from '@material-ui/core'
import { m, useTransform } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { useCartQuery } from '../../hooks/useCartQuery'
import { CartFabDocument } from './CartFab.gql'
import { CartTotalQuantityFragment } from './CartTotalQuantity.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    placeholderFab: {
      width: responsiveVal(42, 56),
      height: responsiveVal(42, 56),
      [theme.breakpoints.down('sm')]: {
        backgroundColor: `${theme.palette.background.paper} !important`,
      },
    },
    cartFab: {
      boxShadow: 'none',
      width: responsiveVal(42, 56),
      height: responsiveVal(42, 56),
      pointerEvents: 'all',
      color: theme.palette.text.primary,
    },
    shadow: {
      pointerEvents: 'none',
      borderRadius: '99em',
      position: 'absolute',
      height: '100%',
      width: '100%',
      boxShadow: theme.shadows[6],
      top: 0,
      [theme.breakpoints.down('sm')]: {
        opacity: '1 !important',
      },
    },
  }),
  { name: 'CartFab' },
)

export type CartFabProps = {
  icon?: React.ReactNode
} & UseStyles<typeof useStyles>

type CartFabContentProps = CartFabProps & CartTotalQuantityFragment

const MotionFab = m(
  React.forwardRef<any, Omit<FabProps, 'style' | 'onDrag'>>((props, ref) => (
    <Fab {...props} ref={ref} />
  )),
)

function CartFabContent(props: CartFabContentProps) {
  const { total_quantity, icon, ...fabProps } = props
  const classes = useStyles(props)

  const theme = useTheme()
  const scrollY = useScrollY()
  const opacity = useTransform(scrollY, [50, 60], [0, 1])

  const paper0 = alpha(theme.palette.background.paper, 0)
  const paper1 = alpha(theme.palette.background.paper, 1)
  const backgroundColor = useTransform(scrollY, [0, 10], [paper0, paper1])

  const cartIcon = icon ?? <SvgImageSimple src={iconShoppingBag} loading='eager' size='large' />
  return (
    <>
      <PageLink href='/cart' passHref>
        <MotionFab
          {...fabProps}
          aria-label={t`Cart`}
          color='inherit'
          size='large'
          classes={{ root: classes.placeholderFab }}
          style={{ backgroundColor }}
        >
          {total_quantity > 0 ? (
            <StyledBadge color='primary' variant='dot'>
              {cartIcon}
            </StyledBadge>
          ) : (
            cartIcon
          )}
        </MotionFab>
      </PageLink>
      <m.div className={classes.shadow} style={{ opacity }} />
    </>
  )
}

/**
 * We give CartFab a bit of special handling. We don't want to make requests for this component
 * whilly nilly. We've imposed some limitations:
 *
 * We use useCartQuery that means that this will only execute when there is a cartId.
 *
 * We use fetchPolicy 'cache-only' so that when the cart comes into existence it will not
 * immediately start fetching. Why? There is a time between creating a cart and adding the first
 * product to the cart. This would mean that it would immediately start executing this query.
 */
export default function CartFab(props: CartFabProps) {
  const classes = useStyles(props)
  const { data } = useCartQuery(CartFabDocument, {
    fetchPolicy: 'cache-only',
    nextFetchPolicy: 'cache-first',
  })
  const qty = data?.cart?.total_quantity ?? 0

  return (
    <Fab color='inherit' aria-label='Open Menu' size='medium' className={classes.cartFab}>
      <NoSsr fallback={<CartFabContent {...props} total_quantity={0} />}>
        <CartFabContent total_quantity={qty} {...props} />
      </NoSsr>
    </Fab>
  )
}
