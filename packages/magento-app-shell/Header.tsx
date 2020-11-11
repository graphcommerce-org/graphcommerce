import { Theme, makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import CartFab from '@reachdigital/magento-cart/CartFab'
import CustomerFab from '@reachdigital/magento-customer/AccountFab'
import SearchButton from '@reachdigital/magento-search/SearchButton'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import { useViewportScroll, m, useTransform, useMotionTemplate } from 'framer-motion'
import React from 'react'
import MenuFab from './MenuFab'
import MenuTabs from './MenuTabs'
import { PageLayoutQuery } from './PageLayout.gql'
import logo from './logo.svg'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      position: 'fixed',
      zIndex: 1,
      width: '100%',
    },
    header: {
      padding: `${theme.page.vertical} ${theme.page.horizontal} 7px`,
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
      zIndex: theme.zIndex.appBar,
      position: 'fixed',
      bottom: theme.page.vertical,
      left: theme.page.horizontal,
      '& > *': {
        pointerEvents: 'all',
      },
      display: 'unset',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    mobileActions: {
      zIndex: 99999,
      position: 'fixed',
      bottom: theme.page.vertical,
      right: theme.page.horizontal,
      display: 'unset',
      [theme.breakpoints.up('md')]: {
        display: 'none',
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
  const { scrollY } = useViewportScroll()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const { menu, urlResolver, ...headerProps } = props

  const y = useTransform(scrollY, [0, 60], [0, -30])
  const shadow = useTransform(scrollY, [0, 60], [-40, 30])
  const filter = useMotionTemplate`drop-shadow(${shadow}px ${shadow}px 20px rgba(0,0,0,0.1))`

  // @todo implement with a stable useMemo: 'use-custom-compare'
  return (
    <m.div style={matches ? { y, filter } : {}} layout className={classes.wrapper}>
      <m.header {...headerProps} className={clsx(classes.header)} layout drag>
        <PageLink href='/'>
          <a className={classes.logo}>
            <img src={logo} alt='Logo' className={classes.logoImg} width={192} height={72} />
          </a>
        </PageLink>

        <MenuTabs menu={menu} urlResolver={urlResolver} className={classes.menuTabs} />

        <div className={clsx(classes.actions, classes.desktopActions)}>
          <SearchButton />
          <CustomerFab />
          <CartFab asIcon />
        </div>

        <div className={classes.mobileMenu}>
          <MenuFab menu={menu} urlResolver={urlResolver} />
        </div>
        <div className={clsx(classes.actions, classes.mobileActions)}>
          <CartFab />
        </div>
      </m.header>
    </m.div>
  )
}
