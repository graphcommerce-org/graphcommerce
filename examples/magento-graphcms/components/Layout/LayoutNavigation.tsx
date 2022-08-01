import { CartFab } from '@graphcommerce/magento-cart'
import {
  useMagentoMenuToNavigation,
  categoryToNav,
  Item as NavigationItem,
} from '@graphcommerce/magento-category'
import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { SearchLink } from '@graphcommerce/magento-search'
import { WishlistFab, WishlistMenuFabItem } from '@graphcommerce/magento-wishlist'
import {
  NavigationPath,
  DesktopNavActions,
  DesktopNavBar,
  LayoutDefault,
  LayoutDefaultProps,
  iconCustomerService,
  iconHeart,
  NavigationFab,
  MenuFabSecondaryItem,
  PlaceholderFab,
  IconSvg,
  DesktopNavItem,
  DarkLightModeMenuSecondaryItem,
  iconChevronDown,
  NavigationProvider,
  NavigationOverlay,
  NavigationNode,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Divider, Fab } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { useState, Suspense } from 'react'
import { DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { Footer } from './Footer'
import { Logo } from './Logo'

export type LayoutNavigationProps = Omit<
  DefaultPageQuery & Omit<LayoutDefaultProps, 'footer'>,
  'pages' | 'header' | 'cartFab' | 'navigationFab'
>

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { footer, menu = {}, ...uiProps } = props

  const [selected, setSelected] = useState<NavigationPath>([])
  const [navigationActive, setNavigationActive] = useState(false)
  const router = useRouter()

  return (
    <>
      <Suspense>
        <NavigationProvider
          onClose={() => setNavigationActive(false)}
          selected={selected}
          setSelected={setSelected}
          items={[
            <SearchLink href='/search' sx={(theme) => ({ width: '100%', mb: theme.spacings.xs })}>
              <Trans id='Search...' />
            </SearchLink>,
            // ...useMagentoMenuToNavigation(menu),
            {
              id: 'manual-item-one',
              href: `/${menu?.items?.[0]?.url_path}`,
              name: menu?.items?.[0]?.name ?? ''
            },
            {
              id: 'manual-item-two',
              href: `/${menu?.items?.[1]?.url_path}`,
              name: menu?.items?.[1]?.name ?? ''
            },
            {
              id: 'shop',
              name: i18n._(/* i18n */ `Shop`),
              childItems: useMagentoMenuToNavigation(menu),
            },
            { id: 'blog', name: 'Blog', href: '/blog' },
            <Divider sx={(theme) => ({ my: theme.spacings.xs })} />,
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
          <NavigationOverlay
            active={navigationActive}
            stretchColumns={false}
            variantSm='bottom'
            sizeSm='full'
            justifySm='start'
            // itemWidthSm='70vw'
            variantMd='left'
            sizeMd='full'
            justifyMd='start'
            itemWidthMd='230px'
            mouseEvent='hover'
          />
        </NavigationProvider>
      </Suspense>

      <LayoutDefault
        {...uiProps}
        noSticky={router.asPath.split('?')[0] === '/'}
        header={
          <>
            <Logo />
            <DesktopNavBar>
              {menu?.items?.slice(0, 2).map((item) => (
                <DesktopNavItem key={item?.uid} href={`/${item?.url_path}`}>
                  {item?.name}
                </DesktopNavItem>
              ))}

              <DesktopNavItem
                onClick={() => {
                  setSelected(['shop'])
                  setNavigationActive(true)
                }}
              >
                <Trans id='Shop' />
                <IconSvg src={iconChevronDown} />
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
        menuFab={<NavigationFab onClick={() => setNavigationActive(true)} />}
      >
        {uiProps.children}
      </LayoutDefault>
    </>
  )
}
