import { useQuery } from '@apollo/client'
import { Badge, Fab, FabProps, makeStyles, NoSsr, Theme } from '@material-ui/core'
import useFabAnimation from '@reachdigital/next-ui/AppShell/useFabAnimation'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { m } from 'framer-motion'
import React from 'react'
import { ClientCartDocument } from './ClientCart.gql'

type CartFabProps = {
  qty?: number
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

function CartFabContent(props: CartFabProps) {
  const { qty, children, ...fabProps } = props
  const classes = useStyles()
  const { filter } = useFabAnimation()

  return (
    <m.div className={classes.cart} style={{ filter }}>
      <PageLink href='/cart'>
        <Fab aria-label='Cart' color='inherit' size='large' {...fabProps}>
          <Badge badgeContent={qty || 0} color='primary' variant='dot'>
            {children}
          </Badge>
        </Fab>
      </PageLink>
    </m.div>
  )
}

export default function CartFab(props: CartFabProps) {
  const { data: cartData } = useQuery(ClientCartDocument)

  return (
    <NoSsr fallback={<CartFabContent {...props} />}>
      <CartFabContent qty={cartData?.cart?.total_quantity} {...props} />
    </NoSsr>
  )
}
