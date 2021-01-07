import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MenuFab from '@reachdigital/magento-app-shell/MenuFab'
import { PageLayoutQuery } from '@reachdigital/magento-app-shell/PageLayout.gql'
import CartFab from '@reachdigital/magento-cart/CartFab'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import { m, useTransform, useViewportScroll } from 'framer-motion'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    mobileMenu: {
      [theme.breakpoints.up('md')]: {
        top: 10,
        bottom: 'auto',
      },
      [theme.breakpoints.down('sm')]: {
        top: 'auto !important',
        opacity: '1 !important',
        bottom: theme.page.vertical,
      },
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: theme.zIndex.appBar,
      position: 'fixed',
      bottom: theme.page.vertical,
      paddingLeft: theme.page.horizontal,
      paddingRight: theme.page.horizontal,
      width: '100%',
      '& > *': {
        pointerEvents: 'all',
      },
    },
    cartFab: {
      '& a': {
        boxShadow: theme.shadows[2],
        padding: 28,
      },
    },
  }),
  { name: 'MobileMenu' },
)

type MobileMenuProps = PageLayoutQuery & ResolveUrlQuery

export default function MobileMenu(props: MobileMenuProps) {
  const { menu, urlResolver } = props
  const classes = useStyles()

  const { scrollY } = useViewportScroll()
  const actionsAnimOpacity = useTransform(scrollY, [50, 130], [0, 1])
  const actionsAnimTop = useTransform(scrollY, [-50, 80], [-50, 10])

  return (
    <m.div
      className={classes.mobileMenu}
      style={{ opacity: actionsAnimOpacity, top: actionsAnimTop }}
    >
      <MenuFab menu={menu} urlResolver={urlResolver} />
      <div className={classes.cartFab}>
        <CartFab />
      </div>
    </m.div>
  )
}
