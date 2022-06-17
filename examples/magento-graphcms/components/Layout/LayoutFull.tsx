import { CartFab } from '@graphcommerce/magento-cart'
import { useMagentoMenuToNavigation } from '@graphcommerce/magento-category'
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
  DarkLightModeMenuSecondaryItem,
  iconChevronDown,
  NavigationOverlay,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Divider, Fab, Link } from '@mui/material'
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

  return (
    <>
      <NavigationOverlay
        active={active}
        onClose={() => setActive(false)}
        sx={(theme) => ({
          py: theme.spacings.md,
        })}
        stretchColumns={false}
        items={[
          <SearchLink href='/search' sx={(theme) => ({ width: '100%', mb: theme.spacings.xs })}>
            <Trans id='Search...' />
          </SearchLink>,
          { id: 'home', name: 'Home', href: '/' },
          // ...useMagentoMenuToNavigation(menu),
          {
            id: 'products',
            name: i18n._(/* i18n */ `Products`),
            childItems: useMagentoMenuToNavigation(menu),
          },
          { id: 'blog', name: 'Blog', href: '/blog' },
          <Divider sx={(theme) => ({ my: theme.spacings.xs })} />,
          <Box>
            <CustomerMenuFabItem key='account' guestHref='/account/signin' authHref='/account'>
              <Trans id='Account' />
            </CustomerMenuFabItem>
            <MenuFabSecondaryItem
              key='service'
              icon={<IconSvg src={iconCustomerService} size='medium' />}
              href='/service'
            >
              <Trans id='Customer Service' />
            </MenuFabSecondaryItem>
            <WishlistMenuFabItem key='wishlist' icon={<IconSvg src={iconHeart} size='medium' />}>
              <Trans id='Wishlist' />
            </WishlistMenuFabItem>
            <DarkLightModeMenuSecondaryItem key='darkmode' />
          </Box>,
        ]}
        renderItem={() => <Box />}
      />

      {/* <MegaMenuOverlay menu={menu} active={active} close={close} /> */}
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
        menuFab={<MenuFab onClick={() => setActive(true)} />}
      >
        {children}
      </LayoutDefault>
    </>
  )
}
