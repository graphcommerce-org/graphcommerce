import { Theme, makeStyles } from '@material-ui/core'
import CartFab from '@reachdigital/magento-cart/CartFab'
import CustomerFab from '@reachdigital/magento-customer/AccountFab'
import SearchButton from '@reachdigital/magento-search/SearchButton'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import { m, useTransform, useViewportScroll } from 'framer-motion'
import React from 'react'
import MenuFab from './MenuFab'
import MenuTabs from './MenuTabs'
import { PageLayoutQuery } from './PageLayout.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      padding: `${theme.spacings.sm} ${theme.page.horizontal} ${theme.spacings.sm}`,
      top: 0,
      display: 'flex',
      pointerEvents: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      [theme.breakpoints.down('sm')]: {},
      [theme.breakpoints.up('md')]: {
        background: theme.palette.background.default,
      },
    },
    logo: {
      pointerEvents: 'all',
      [theme.breakpoints.down('sm')]: {},
      [theme.breakpoints.up('md')]: {
        marginRight: `${theme.spacings.md}`,
      },
    },
    logoImg: {
      height: theme.page.headerInnerHeight.xs,
      display: 'block',
      width: 'auto',
      paddingBottom: responsiveVal(4, 7), // todo(paales): should be removed when we have a proper logo
      [theme.breakpoints.down('sm')]: {},
      [theme.breakpoints.up('md')]: {},
    },
    menuTabs: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
        pointerEvents: 'all',
        marginLeft: `calc(${theme.spacings.xxs} * -1)`,
        marginRight: `calc(${theme.spacings.xxs} * -1)`,
        flexGrow: 1,
      },
    },
    actions: {
      '& > *': {
        pointerEvents: 'all',
      },
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        marginLeft: `${theme.spacings.sm}`,
        '& > *': {
          marginLeft: responsiveVal(0, 20),
        },
        '& :first-child': {
          marginLeft: 0,
        },
      },
    },
    desktopActions: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
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
    ghostCartIcon: {
      padding: 12,
      width: 36,
      height: 48,
    },
    // mobileActions: {
    //   [theme.breakpoints.up('md')]: {
    //     display: 'none',
    //   },
    //   zIndex: theme.zIndex.appBar,
    //   position: 'fixed',
    //   bottom: theme.page.vertical,
    //   right: theme.page.horizontal,
    // },
    cartFab: {
      '& a': {
        boxShadow: theme.shadows[2],
        padding: 28,
      },
    },
  }),
  { name: 'AppLayout' },
)

type HeaderElementProps = UseStyles<typeof useStyles>

type HeaderDataProps = PageLayoutQuery & ResolveUrlQuery

export type HeaderProps = HeaderDataProps & HeaderElementProps

export default function Header(props: HeaderProps) {
  const classes = useStyles(props)
  const { menu, urlResolver, ...headerProps } = props

  const { scrollY } = useViewportScroll()
  const actionsAnimOpacity = useTransform(scrollY, [50, 130], [0, 1])
  const actionsAnimTop = useTransform(scrollY, [-50, 80], [-50, 10])

  // @todo implement with a stable useMemo: 'use-custom-compare'
  return (
    <>
      <m.header
        {...headerProps}
        className={clsx(classes.header)}
        layoutId='header'
        transition={{ type: 'tween' }}
      >
        <PageLink href='/'>
          <a className={classes.logo}>
            <img
              src='/logo.svg'
              alt='Logo'
              className={classes.logoImg}
              width={192}
              height={72}
              loading='eager'
            />
          </a>
        </PageLink>

        <MenuTabs menu={menu} urlResolver={urlResolver} className={classes.menuTabs} />

        <div className={clsx(classes.actions, classes.desktopActions)}>
          <SearchButton />
          <CustomerFab />
          <CartFab asIcon />
        </div>

        <m.div
          className={classes.mobileMenu}
          style={{ opacity: actionsAnimOpacity, top: actionsAnimTop }}
        >
          <MenuFab menu={menu} urlResolver={urlResolver} />
          <div className={classes.cartFab}>
            <CartFab />
          </div>
        </m.div>
      </m.header>
    </>
  )
}
