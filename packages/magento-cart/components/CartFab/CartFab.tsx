import { Badge, Fab, FabProps, makeStyles, NoSsr, Theme } from '@material-ui/core'
import useFabAnimation from '@reachdigital/next-ui/AppShell/useFabAnimation'
import StyledBadge from '@reachdigital/next-ui/StyledBadge'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconShoppingBag } from '@reachdigital/next-ui/icons'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'

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

function CartFabContent(props: CartFabProps) {
  const { icon, ...fabProps } = props
  const classes = useStyles()
  const { filter } = useFabAnimation()

  return (
    <m.div className={classes.wrapper} style={{ filter }}>
      <PageLink href='/cart' passHref>
        <Fab aria-label='Cart' color='inherit' size='large' className={classes.fab} {...fabProps}>
          <Badge>
            <StyledBadge color='primary' variant='dot'>
              {icon ?? <SvgImage src={iconShoppingBag} alt='Shopping Bag' loading='eager' />}
            </StyledBadge>
          </Badge>
        </Fab>
      </PageLink>
    </m.div>
  )
}

export default function CartFab(props: CartFabProps) {
  return (
    <NoSsr fallback={<CartFabContent {...props} />}>
      <CartFabContent {...props} />
    </NoSsr>
  )
}
