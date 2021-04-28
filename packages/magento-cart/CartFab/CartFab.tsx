import { Badge, Fab, FabProps, makeStyles, NoSsr, Theme } from '@material-ui/core'
import useFabAnimation from '@reachdigital/next-ui/AppShell/useFabAnimation'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { useQueryWithCartId } from '../CurrentCartId/useQueryWithCartId'
import { CartFabFragment } from './CartFab.gql'
import { CartFabQueryDocument } from './CartFabQuery.gql'

type CartFabProps = {
  children: React.ReactNode
} & Omit<FabProps, 'children' | 'aria-label'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    cart: {
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
  }),
  { name: 'CartFab' },
)

function CartFabContent(props: CartFabProps & CartFabFragment) {
  const { total_quantity, children, ...fabProps } = props
  const classes = useStyles()
  const { filter } = useFabAnimation()

  return (
    <m.div className={classes.cart} style={{ filter }}>
      <PageLink href='/cart' passHref>
        <Fab aria-label='Cart' color='inherit' size='large' {...fabProps}>
          <Badge badgeContent={total_quantity} color='primary' variant='dot'>
            {children}
          </Badge>
        </Fab>
      </PageLink>
    </m.div>
  )
}

export default function CartFab(props: CartFabProps) {
  const { data } = useQueryWithCartId(CartFabQueryDocument)
  const qty = data?.cart?.total_quantity ?? 0
  return (
    <NoSsr fallback={<CartFabContent {...props} total_quantity={qty} />}>
      <CartFabContent total_quantity={qty} {...props} />
    </NoSsr>
  )
}
