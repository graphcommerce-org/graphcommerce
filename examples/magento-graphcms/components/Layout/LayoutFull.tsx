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
  MenuProps,
  PlaceholderFab,
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Fab, useTheme } from '@material-ui/core'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import { Footer } from './Footer'
import Logo from './Logo'

export type LayoutFullProps = Omit<
  DefaultPageQuery & Omit<LayoutDefaultProps, 'footer'>,
  'pages' | 'classes' | 'header' | 'cartFab' | 'menuFab'
>

export function LayoutFull(props: LayoutFullProps) {
  const { footer, menu = {}, children, ...uiProps } = props

  const router = useRouter()
  const onSearchStart = useCallback(() => router.push('/search'), [router])
  const theme = useTheme()
  const menuItemsIncludeInMenu = menu?.items?.filter((items) => items?.include_in_menu === 1)

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
      { href: '/blog', children: t`Blog` },
    ],
  }

  return (
    <LayoutDefault
      {...uiProps}
      noSticky={router.asPath === '/'}
      header={
        <>
          <Logo />
          <DesktopNavBar {...menuProps} />
          <DesktopNavActions>
            {!router.pathname.startsWith('/search') && (
              <SearchButton onClick={onSearchStart} label=' ' />
            )}
            <PageLink href='/service' passHref>
              <Fab aria-label={t`Account`} size='large' color='inherit'>
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
        <MenuFab
          {...menuProps}
          search={<SearchButton onClick={onSearchStart} label=' ' fullWidth />}
        >
          <CustomerMenuFabItem guestHref='/account/signin' authHref='/account'>
            <Trans>Account</Trans>
          </CustomerMenuFabItem>
          <MenuFabSecondaryItem icon={<SvgImageSimple src={iconCustomerService} />} href='/service'>
            <Trans>Customer Service</Trans>
          </MenuFabSecondaryItem>
        </MenuFab>
      }
    >
      {children}
    </LayoutDefault>
  )
}
