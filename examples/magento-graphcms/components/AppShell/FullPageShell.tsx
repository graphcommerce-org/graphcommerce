import { useQuery } from '@apollo/client'
import { CartFab } from '@graphcommerce/magento-cart'
import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { SearchButton } from '@graphcommerce/magento-search'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  DesktopNavActions,
  DesktopNavBar,
  FullPageShellBase,
  FullPageShellBaseProps,
  iconCustomerService,
  iconHeart,
  MenuFab,
  MenuFabSecondaryItem,
  MenuProps,
  responsiveVal,
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import { Fab, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { LightTheme } from '../Theme/ThemedProvider'
import Footer from './Footer'
import Logo from './Logo'

const useStyles = makeStyles(
  (theme: Theme) => ({
    navbarSearch: {
      marginRight: theme.spacings.xxs,
      width: responsiveVal(64, 172),
    },
    logo: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'unset',
      },
    },
    header: {
      [theme.breakpoints.down('sm')]: {
        marginTop: 20,
        marginBottom: 22,
      },
    },
    hideOnVirtualKeyboardOpen: {
      [theme.breakpoints.down('sm')]: {
        '@media (max-height: 530px)': {
          display: 'none',
        },
      },
    },
    cartFab: {
      [theme.breakpoints.down('sm')]: {
        width: responsiveVal(42, 56),
        height: responsiveVal(42, 56),
      },
    },
    placeholderCartFab: {
      boxShadow: 'none',
      background: 'none',
      pointerEvents: 'none',
    },
  }),
  { name: 'FullPageShell' },
)

export type FullPageShellProps = Omit<
  FullPageShellBaseProps,
  'menu' | 'logo' | 'actions' | 'classes' | 'name' | 'header' | 'footer'
> & {
  alwaysShowLogo?: boolean
}

function FullPageShell(props: FullPageShellProps) {
  const { children, alwaysShowLogo } = props
  const classes = useStyles()

  const menuProps: MenuProps = {
    menu: [{ href: 'yeag', children: 'Hea' }],
  }

  const router = useRouter()
  const onSearchStart = useCallback(() => router.push('/search'), [router])

  return (
    <FullPageShellBase
      name='GraphCommerce®'
      classes={{ header: alwaysShowLogo ? classes.header : undefined }}
      header={
        <>
          <Logo classes={{ logo: alwaysShowLogo ? undefined : classes.logo }} />
          <DesktopNavBar {...menuProps} />
          <DesktopNavActions>
            {!router.pathname.startsWith('/search') && (
              <SearchButton onClick={onSearchStart} classes={{ root: classes.navbarSearch }} />
            )}
            <PageLink href='/service' passHref>
              <Fab style={{ boxShadow: 'none' }} aria-label='Account' size='large'>
                <SvgImageSimple
                  src={iconCustomerService}
                  alt='Customer Service'
                  loading='eager'
                  size='large'
                />
              </Fab>
            </PageLink>
            <CustomerFab guestHref='/account/signin' authHref='/account' />
            <Fab className={classes.placeholderCartFab} size='large'>
              <></>
            </Fab>
          </DesktopNavActions>
        </>
      }
      footer={
        <LightTheme>
          <Footer />
        </LightTheme>
      }
    >
      <MenuFab
        {...menuProps}
        search={<SearchButton onClick={onSearchStart} />}
        classes={{ menuWrapper: classes.hideOnVirtualKeyboardOpen }}
      >
        <CustomerMenuFabItem guestHref='/account/signin' authHref='/account'>
          Account
        </CustomerMenuFabItem>
        <MenuFabSecondaryItem
          icon={<SvgImageSimple src={iconCustomerService} alt='Customer Service' />}
          href='/service'
        >
          Customer Service
        </MenuFabSecondaryItem>
        <MenuFabSecondaryItem
          icon={<SvgImageSimple src={iconHeart} alt='Wishlist' />}
          href='/wishlist'
        >
          Wishlist
        </MenuFabSecondaryItem>
      </MenuFab>

      <CartFab className={clsx(classes.cartFab, classes.hideOnVirtualKeyboardOpen)} />

      {children}
    </FullPageShellBase>
  )
}

export default FullPageShell
