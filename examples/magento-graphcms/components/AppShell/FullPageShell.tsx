import { useQuery } from '@apollo/client'
import { useMotionValueValue } from '@graphcommerce/framer-utils'
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
import { Fab, makeStyles, Theme, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import { useViewportScroll } from 'framer-motion'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
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

export type FullPageShellProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<
    FullPageShellBaseProps,
    'menu' | 'logo' | 'actions' | 'classes' | 'name' | 'header' | 'footer'
  > & {
    alwaysShowLogo?: boolean
  }

function FullPageShell(props: FullPageShellProps) {
  const { footer, menu: menuData = {}, children, alwaysShowLogo, ...uiProps } = props
  const theme = useTheme()
  const classes = useStyles()

  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  const menuItemsIncludeInMenu = menuData?.items?.filter((items) => items?.include_in_menu === 1)

  const menuProps: MenuProps = {
    menu: [
      ...(menuItemsIncludeInMenu?.map((item) => ({
        href: `/${item?.url_path}`,
        children: item?.name?.toLowerCase().includes('sale') ? (
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: 0.3,
              color: theme.palette.primary.main,
            }}
          >
            {item.name}
          </span>
        ) : (
          item?.name ?? ''
        ),
      })) ?? []),
      { href: '/blog', children: 'Blog' },
    ],
  }

  const router = useRouter()
  const onSearchStart = useCallback(() => router.push('/search'), [router])

  return (
    <FullPageShellBase
      {...uiProps}
      name={name}
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
      footer={<Footer footer={footer} />}
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
      </MenuFab>

      <CartFab className={clsx(classes.cartFab, classes.hideOnVirtualKeyboardOpen)} />

      {children}
    </FullPageShellBase>
  )
}

export default FullPageShell
