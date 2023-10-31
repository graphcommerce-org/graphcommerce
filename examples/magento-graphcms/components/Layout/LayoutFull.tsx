import { CartFab } from '@graphcommerce/magento-cart'
import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { SearchLink } from '@graphcommerce/magento-search'
import { WishlistFab, WishlistMenuFabItem } from '@graphcommerce/magento-wishlist'
import {
  DesktopNavActions,
  DesktopNavBar,
  LayoutDefault,
  LayoutDefaultProps,
  iconCustomerService,
  iconHeart,
  MenuFab,
  MenuFabSecondaryItem,
  PlaceholderFab,
  IconSvg,
  DesktopNavItem,
  MenuFabItem,
  DarkLightModeMenuSecondaryItem,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Fab } from '@mui/material'
import { useRouter } from 'next/router'
import { Footer } from './Footer'
import { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'

export type LayoutFullProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'>

export function LayoutFull(props: LayoutFullProps) {
  const { footer, menu, children, ...uiProps } = props

  const router = useRouter()
  const menuItemsIncludeInMenu = menu?.items?.filter((items) => items?.include_in_menu === 1)

  return (
    <LayoutDefault
      {...uiProps}
      noSticky={router.asPath.split('?')[0] === '/'}
      header={
        <>
          <Logo />
          <DesktopNavBar>
            {menuItemsIncludeInMenu?.map((item) => {
              const highLight = item?.name?.toLowerCase().includes('sale')
                ? { textTransform: 'uppercase', letterSpacing: 0.3, color: 'primary.main' }
                : {}
              return (
                <DesktopNavItem key={item?.uid} href={`/${item?.url_path}`} sx={highLight}>
                  {item?.name}
                </DesktopNavItem>
              )
            })}
            <DesktopNavItem href='/blog'>
              <Trans id='Blog' />
            </DesktopNavItem>
          </DesktopNavBar>
          <DesktopNavActions>
            {!router.pathname.startsWith('/search') && (
              <SearchLink href='/search' aria-label={i18n._(/* i18n */ 'Search...')} />
            )}
            <Fab
              href='/service'
              aria-label={i18n._(/* i18n*/ `CustomerService`)}
              size='large'
              color='inherit'
            >
              <IconSvg src={iconCustomerService} size='large' />
            </Fab>
            <WishlistFab icon={<IconSvg src={iconHeart} size='large' />} />
            <CustomerFab guestHref='/account/signin' authHref='/account' />
            {/* The placeholder exists because the CartFab is sticky but we want to reserve the space for the <CartFab /> */}
            <PlaceholderFab />
          </DesktopNavActions>
        </>
      }
      footer={<Footer footer={footer} />}
      cartFab={<CartFab />}
      menuFab={
        <MenuFab
          search={
            <SearchLink
              href='/search'
              sx={{ width: '100%' }}
              aria-label={i18n._(/* i18n */ 'Search...')}
            >
              <Trans id='Search...' />
            </SearchLink>
          }
          secondary={[
            <CustomerMenuFabItem key='account' guestHref='/account/signin' authHref='/account'>
              <Trans id='Account' />
            </CustomerMenuFabItem>,
            <MenuFabSecondaryItem
              key='service'
              icon={<IconSvg src={iconCustomerService} size='medium' />}
              href='/service'
            >
              <Trans id='Customer Service' />
            </MenuFabSecondaryItem>,
            <WishlistMenuFabItem key='wishlist' icon={<IconSvg src={iconHeart} size='medium' />}>
              <Trans id='Wishlist' />
            </WishlistMenuFabItem>,
            <DarkLightModeMenuSecondaryItem key='darkmode' />,
          ]}
        >
          <MenuFabItem href='/'>
            <Trans id='Home' />
          </MenuFabItem>
          {menuItemsIncludeInMenu?.map((item) => {
            const highLight = item?.name?.toLowerCase().includes('sale')
              ? { textTransform: 'uppercase', letterSpacing: 0.3, color: 'primary.main' }
              : {}
            return (
              <MenuFabItem key={item?.uid} href={`/${item?.url_path}`} sx={highLight}>
                {item?.name}
              </MenuFabItem>
            )
          })}
          <MenuFabItem href='/blog'>
            <Trans id='Blog' />
          </MenuFabItem>
        </MenuFab>
      }
    >
      {children}
    </LayoutDefault>
  )
}
