import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MenuFab from '@reachdigital/magento-app-shell/MenuFab'
import { PageLayoutQuery } from '@reachdigital/magento-app-shell/PageLayout.gql'
import CartFab from '@reachdigital/magento-cart/CartFab'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import { m, useMotionTemplate, useTransform, useViewportScroll } from 'framer-motion'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.up('md')]: {
        top: theme.page.vertical,
        bottom: 'auto',
      },
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: 8,
      position: 'fixed',
      bottom: theme.page.vertical,
      paddingLeft: theme.page.horizontal,
      paddingRight: theme.page.horizontal,
      width: '100%',
      '& > *': {
        pointerEvents: 'all',
      },
    },
    menu: {
      [theme.breakpoints.down('sm')]: {
        transform: 'none !important',
        opacity: '1 !important',
        bottom: theme.page.vertical,
      },
    },
    cartFab: {
      boxShadow: 'none',
    },
  }),
  { name: 'MobileMenu' },
)

type MobileMenuProps = PageLayoutQuery & ResolveUrlQuery

export default function FabMenu(props: MobileMenuProps) {
  const { menu, urlResolver } = props
  const classes = useStyles()

  const { scrollY } = useViewportScroll()
  const actionsAnimOpacity = useTransform(scrollY, [50, 130], [0, 1])
  const actionsAnimTop = useTransform(scrollY, [50, 130], [-30, 0])

  const opacity = useTransform(scrollY, [0, 130], [0, 0.08])
  const opacity2 = useTransform(scrollY, [0, 130], [0, 0.1])
  const filter = useMotionTemplate`
    drop-shadow(0 1px 4px rgba(0,0,0,${opacity}))
    drop-shadow(0 4px 10px rgba(0,0,0,${opacity2}))`

  return (
    <m.div className={classes.root}>
      <m.div
        className={classes.menu}
        style={{ opacity: actionsAnimOpacity, translateY: actionsAnimTop, filter }}
      >
        <MenuFab menu={menu} urlResolver={urlResolver} />
      </m.div>
      <m.div style={{ filter }}>
        <CartFab
          className={classes.cartFab}
          icon={
            <img
              src='/icons/shopping_bag.svg'
              alt='shopping bag'
              width={20}
              height={20}
              loading='eager'
            />
          }
        />
      </m.div>
    </m.div>
  )
}
