import {
  FixedFab,
  iconShoppingBag,
  responsiveVal,
  StyledBadge,
  SvgImageSimple,
  useFixedFabAnimation,
  UseStyles,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Fab, FabProps, makeStyles, NoSsr, Theme } from '@material-ui/core'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { useCartQuery } from '../../hooks/useCartQuery'
import { CartFabDocument } from './CartFab.gql'
import { CartTotalQuantityFragment } from './CartTotalQuantity.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    fab: {
      boxShadow: 'none',
      background: 'none',
      [theme.breakpoints.down('sm')]: {
        width: responsiveVal(42, 56),
        height: responsiveVal(42, 56),
      },
    },
  }),
  {
    name: 'CartFab',
  },
)

export type CartFabProps = {
  icon?: React.ReactNode
} & Omit<FabProps, 'children' | 'aria-label'> &
  UseStyles<typeof useStyles>

type CartFabContentProps = CartFabProps & CartTotalQuantityFragment

function CartFabContent(props: CartFabContentProps) {
  const { total_quantity, icon, ...fabProps } = props
  const cartIcon = icon ?? <SvgImageSimple src={iconShoppingBag} loading='eager' size='large' />
  const { boxShadow, backgroundColor } = useFixedFabAnimation()
  const classes = useStyles(props)

  return (
    <m.div
      style={{
        boxShadow,
        backgroundColor,
        width: 'inherit',
        borderRadius: 'inherit',
      }}
    >
      <PageLink href='/cart' passHref>
        <Fab
          aria-label={t`Cart`}
          color='inherit'
          size='large'
          classes={{ root: classes.fab }}
          {...fabProps}
        >
          {total_quantity > 0 ? (
            <StyledBadge color='primary' variant='dot'>
              {cartIcon}
            </StyledBadge>
          ) : (
            cartIcon
          )}
        </Fab>
      </PageLink>
    </m.div>
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
  const { data } = useCartQuery(CartFabDocument, {
    fetchPolicy: 'cache-only',
    nextFetchPolicy: 'cache-first',
  })
  const qty = data?.cart?.total_quantity ?? 0

  return (
    <FixedFab>
      <NoSsr fallback={<CartFabContent {...props} total_quantity={0} />}>
        <CartFabContent total_quantity={qty} {...props} />
      </NoSsr>
    </FixedFab>
  )
}
