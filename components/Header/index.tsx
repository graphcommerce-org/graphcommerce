import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import CartFab from 'components/Cart/CartFab'
import CustomerFab from 'components/Customer/AccountFab'
import SearchButton from 'components/Search/SearchButton'
import { UseStyles, vpCalc } from 'components/Theme'
import Link from 'next/link'
import React from 'react'
import HeaderMenuFab, { HeaderMenuProps } from './HeaderMenu'
import MenuTabs from './MenuTabs'
import logo from './logo.svg'

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      display: 'flex',
      zIndex: theme.zIndex.appBar,
      padding: `${theme.page.vertical} ${theme.page.horizontal}`,
      pointerEvents: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      [theme.breakpoints.down('sm')]: {},
      [theme.breakpoints.up('md')]: {},
    },
    logo: {
      pointerEvents: 'all',
      [theme.breakpoints.down('sm')]: {},
      [theme.breakpoints.up('md')]: {
        marginRight: `${theme.spacings.md}`,
      },
    },
    logoImg: {
      height: theme.page.headerHeight.xs,
      display: 'block',
      width: 'auto',
      paddingBottom: vpCalc(4, 7), // todo(paales): should be removed when we have a proper logo
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
          marginLeft: vpCalc(0, 20),
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
  { name: 'Header' },
)

type HeaderProps = HeaderMenuProps & JSX.IntrinsicElements['header'] & UseStyles<typeof useStyles>

export default function Header(props: HeaderProps) {
  const classes = useStyles(props)
  const { menu, urlResolver, ...headerProps } = props

  return (
    <header {...headerProps} className={clsx(classes.header, headerProps.className)}>
      <Link href='/' passHref>
        <a className={classes.logo}>
          <img src={logo} alt='Logo' className={classes.logoImg} width={192} height={72} />
        </a>
      </Link>

      <MenuTabs menu={menu} urlResolver={urlResolver} className={classes.menuTabs} />

      <div className={clsx(classes.actions, classes.desktopActions)}>
        <SearchButton />
        <CustomerFab />
        <CartFab asIcon />
      </div>

      <div className={classes.mobileMenu}>
        <HeaderMenuFab menu={menu} urlResolver={urlResolver} />
      </div>
      <div className={clsx(classes.actions, classes.mobileActions)}>
        <CartFab />
      </div>
    </header>
  )
}
