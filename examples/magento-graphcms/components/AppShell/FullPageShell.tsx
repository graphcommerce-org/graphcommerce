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
  MenuFab,
  MenuFabSecondaryItem,
  MenuProps,
  PlaceholderFab,
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import { Fab, useTheme } from '@material-ui/core'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import Footer from './Footer'
import Logo from './Logo'

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
      alwaysShowHeader={alwaysShowLogo}
      header={
        <>
          <Logo alwaysShow={alwaysShowLogo} />
          <DesktopNavBar {...menuProps} />
          <DesktopNavActions>
            {!router.pathname.startsWith('/search') && <SearchButton onClick={onSearchStart} />}
            <PageLink href='/service' passHref>
              <Fab aria-label='Account' size='large' color='inherit'>
                <SvgImageSimple src={iconCustomerService} size='large' />
              </Fab>
            </PageLink>
            <CustomerFab guestHref='/account/signin' authHref='/account' />
            <PlaceholderFab />
          </DesktopNavActions>
        </>
      }
      footer={<Footer footer={footer} />}
      cartFab={<CartFab />}
      menuFab={
        <MenuFab {...menuProps} search={<SearchButton onClick={onSearchStart} />}>
          <CustomerMenuFabItem guestHref='/account/signin' authHref='/account'>
            Account
          </CustomerMenuFabItem>
          <MenuFabSecondaryItem icon={<SvgImageSimple src={iconCustomerService} />} href='/service'>
            Customer Service
          </MenuFabSecondaryItem>
        </MenuFab>
      }
    >
      {children}
    </FullPageShellBase>
  )
}

export default FullPageShell
