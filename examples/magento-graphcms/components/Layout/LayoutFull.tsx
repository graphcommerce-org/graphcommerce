import { CartFab } from '@graphcommerce/magento-cart'
import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { SearchButton } from '@graphcommerce/magento-search'
import {
  DesktopNavActions,
  DesktopNavBar,
  LayoutDefault,
  LayoutDefaultProps,
  iconCustomerService,
  MenuFab,
  MenuFabSecondaryItem,
  PlaceholderFab,
  SvgIcon,
  DesktopNavItem,
  MenuFabItem,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Fab } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
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
  const onSearchStart = useCallback(() => router.push('/search'), [router])
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
              <Trans>Blog</Trans>
            </DesktopNavItem>
          </DesktopNavBar>
          <DesktopNavActions>
            {!router.pathname.startsWith('/search') && (
              <SearchButton onClick={onSearchStart} label=' ' />
            )}
            <PageLink href='/service' passHref>
              <Fab aria-label={t`Account`} size='large' color='inherit'>
                <SvgIcon src={iconCustomerService} size='large' />
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
        <MenuFab
          search={<SearchButton onClick={onSearchStart} label={t`Search...`} fullWidth />}
          secondary={
            <>
              <CustomerMenuFabItem guestHref='/account/signin' authHref='/account'>
                <Trans>Account</Trans>
              </CustomerMenuFabItem>
              <MenuFabSecondaryItem icon={<SvgIcon src={iconCustomerService} />} href='/service'>
                <Trans>Customer Service</Trans>
              </MenuFabSecondaryItem>
            </>
          }
        >
          <MenuFabItem href='/'>
            <Trans>Home</Trans>
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
            <Trans>Blog</Trans>
          </MenuFabItem>
        </MenuFab>
      }
    >
      {children}
    </LayoutDefault>
  )
}
