import { Fab, FabProps, makeStyles, NoSsr, Theme } from '@material-ui/core'
import useFabAnimation from '@reachdigital/next-ui/AppShell/useFabAnimation'
import StyledBadge from '@reachdigital/next-ui/StyledBadge'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconShoppingBag } from '@reachdigital/next-ui/icons'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { useCartQuery } from '../../hooks/useCartQuery'
import { CartFabDocument } from './CartFab.gql'
import { CartTotalQuantityFragment } from './CartTotalQuantity.gql'

export type CartFabProps = {
  icon?: React.ReactNode
} & Omit<FabProps, 'children' | 'aria-label'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      position: 'fixed',
      zIndex: 8,
      right: theme.page.horizontal,
      [theme.breakpoints.down('sm')]: {
        bottom: theme.page.vertical,
      },
      [theme.breakpoints.up('md')]: {
        top: theme.page.vertical,
      },
    },
    fab: {
      width: responsiveVal(42, 56),
      height: responsiveVal(42, 56),
    },
  }),
  { name: 'CartFab' },
)

function CartFabContent(props: CartFabProps & CartTotalQuantityFragment) {
  const { total_quantity, icon, ...fabProps } = props
  const classes = useStyles()
  const { filter } = useFabAnimation()
  const cartIcon = icon ?? <SvgImage src={iconShoppingBag} alt='Shopping Bag' loading='eager' />

  return (
    <m.div className={classes.wrapper} style={{ filter }}>
      <PageLink href='/cart' passHref>
        <Fab aria-label='Cart' color='inherit' size='large' className={classes.fab} {...fabProps}>
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

export default function CartFab(props: CartFabProps) {
  const { data } = useCartQuery(CartFabDocument, {
    fetchPolicy: 'cache-only',
    nextFetchPolicy: 'cache-first',
  })
  const qty = data?.cart?.total_quantity ?? 0

  return (
    <NoSsr fallback={<CartFabContent {...props} total_quantity={0} />}>
      <CartFabContent total_quantity={qty} {...props} />
    </NoSsr>
  )
}
