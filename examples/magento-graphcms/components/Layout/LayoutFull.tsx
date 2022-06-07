import { CartFab } from '@graphcommerce/magento-cart'
import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { MegaMenuOverlay } from '@graphcommerce/magento-megamenu'
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
  iconChevronRight,
  iconChevronDown,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Fab, Link, ListItemButton, ListItemText } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { Footer } from './Footer'
import { Logo } from './Logo'

export type LayoutFullProps = Omit<
  DefaultPageQuery & Omit<LayoutDefaultProps, 'footer'>,
  'pages' | 'header' | 'cartFab' | 'menuFab'
>

export function LayoutFull(props: LayoutFullProps) {
  const { footer, menu = {}, children, ...uiProps } = props

  const [active, setActive] = useState(false)
  const close = () => setActive(false)

  const router = useRouter()
  const menuItemsIncludeInMenu = menu?.items?.filter((items) => items?.include_in_menu === 1)

  return (
    <>
      <MegaMenuOverlay menu={menu} active={active} close={close} addLevel />
      <LayoutDefault
        {...uiProps}
        noSticky={router.asPath.split('?')[0] === '/'}
        header={
          <>
            <Logo />
            <DesktopNavBar>
              {/* {menuItemsIncludeInMenu?.map((item) => {
              const highLight = item?.name?.toLowerCase().includes('sale')
                ? { textTransform: 'uppercase', letterSpacing: 0.3, color: 'primary.main' }
                : {}
              return (
                <DesktopNavItem key={item?.uid} href={`/${item?.url_path}`} sx={highLight}>
                  {item?.name}
                </DesktopNavItem>
              )
            })} */}

              <Link
                variant='h6'
                color='text.primary'
                underline='none'
                onClick={() => setActive(true)}
                sx={{ whiteSpace: 'nowrap', paddingTop: '6px' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Trans id='Products' />
                  <IconSvg src={iconChevronDown} />
                </Box>
              </Link>

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
        menuFab={<PlaceholderFab />}
      >
        {children}
      </LayoutDefault>
    </>
  )
}
