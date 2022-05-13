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
  iconChevronDown,
  iconChevronRight,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Fab } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { Footer } from './Footer'
import { Logo } from './Logo'

export type LayoutFullProps = Omit<
  DefaultPageQuery & Omit<LayoutDefaultProps, 'footer'>,
  'pages' | 'header' | 'cartFab' | 'menuFab'
>

export function LayoutFull(props: LayoutFullProps) {
  const { footer, menu = {}, children, ...uiProps } = props

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
            <DesktopNavItem href='/menu'>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Trans id='Products' />
                <IconSvg src={iconChevronDown} />
              </Box>
            </DesktopNavItem>

            {menuItemsIncludeInMenu?.map((item) => {
              if (item?.name?.toLowerCase().includes('sale')) {
                return (
                  <DesktopNavItem
                    key={item?.uid}
                    href={`/${item?.url_path}`}
                    sx={{ textTransform: 'uppercase', letterSpacing: 0.3, color: 'primary.main' }}
                  >
                    {item?.name}
                  </DesktopNavItem>
                )
              }
              return false
            })}
            <DesktopNavItem href='#'>
              <Trans id='Stories' />
            </DesktopNavItem>
            <DesktopNavItem href='/blog'>
              <Trans id='Blog' />
            </DesktopNavItem>
          </DesktopNavBar>
          <DesktopNavActions>
            {!router.pathname.startsWith('/search') && <SearchLink href='/search' />}
            <PageLink href='/service' passHref>
              <Fab aria-label={i18n._(/* i18n */ `Account`)} size='large' color='inherit'>
                <IconSvg src={iconCustomerService} size='large' />
              </Fab>
            </PageLink>
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
            <SearchLink href='/search' sx={{ width: '100%' }}>
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
          <MenuFabItem href='/menu'>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Trans id='Products' />
              <IconSvg src={iconChevronRight} />
            </Box>
          </MenuFabItem>
          {menuItemsIncludeInMenu?.map((item) => {
            if (item?.name?.toLowerCase().includes('sale')) {
              return (
                <MenuFabItem
                  key={item?.uid}
                  href={`/${item?.url_path}`}
                  sx={{ textTransform: 'uppercase', letterSpacing: 0.3, color: 'primary.main' }}
                >
                  {item?.name}
                </MenuFabItem>
              )
            }
            return false
          })}
          <MenuFabItem href='#'>
            <Trans id='Stories' />
          </MenuFabItem>
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
