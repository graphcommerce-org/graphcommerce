'use client'

import {
  DesktopNavActions,
  DesktopNavBar,
  DesktopNavItem,
  iconChevronDown,
  iconCustomerService,
  iconHeart,
  iconMenu,
  IconSvg,
  MobileTopRight,
  PlaceholderFab,
  useNavigationSelection,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Fab } from '@mui/material'
import { useParams, usePathname } from 'next/navigation'
import { useMemo } from 'react'
import type { ReactNode } from 'react'
import type { LayoutQuery } from '../../graphql/Layout.gql'
import { Footer } from './Footer'
import { LayoutDefaultRsc } from './LayoutDefaultRsc'
import { Logo } from './Logo'
import { magentoMenuToNavigation } from './magentoMenuToNavigation'
import { NavigationDrawer } from './NavigationDrawer'

export type LayoutNavigationProps = {
  children: ReactNode
  menu?: LayoutQuery['menu']
  cmsBlocks?: LayoutQuery['cmsBlocks']
}

/**
 * Layout Navigation component for App Router Uses a simplified MUI Drawer for navigation instead of
 * the scroll-snap based overlay
 */
export function LayoutNavigation(props: LayoutNavigationProps) {
  const { menu, children, cmsBlocks } = props

  const selection = useNavigationSelection()
  const pathname = usePathname()
  const params = useParams<{ store: string }>()
  const store = params.store

  const isHomePage = pathname === `/${store}` || pathname === `/${store}/`

  const footerBlock = cmsBlocks?.items?.find((item) => item?.identifier === 'footer_links_block')

  // Build navigation items for the drawer
  const navItems = useMemo(
    () => [
      { id: 'home', name: <Trans>Home</Trans>, href: `/${store}` },
      {
        id: 'manual-item-one',
        href: `/${store}/${menu?.items?.[0]?.children?.[0]?.url_path ?? ''}`,
        name: menu?.items?.[0]?.children?.[0]?.name ?? '',
      },
      {
        id: 'manual-item-two',
        href: `/${store}/${menu?.items?.[0]?.children?.[1]?.url_path ?? ''}`,
        name: menu?.items?.[0]?.children?.[1]?.name ?? '',
      },
      ...magentoMenuToNavigation(menu, true, store),
    ],
    [menu, store],
  )

  return (
    <>
      <NavigationDrawer selection={selection} items={navItems} menu={menu} store={store} />

      <LayoutDefaultRsc
        noSticky={isHomePage}
        header={
          <>
            <Logo />

            <DesktopNavBar>
              {menu?.items?.[0]?.children?.slice(0, 2).map((item) => (
                <DesktopNavItem key={item?.uid} href={`/${store}/${item?.url_path ?? ''}`}>
                  {item?.name}
                </DesktopNavItem>
              ))}
              <DesktopNavItem
                onClick={() => selection.set([menu?.items?.[0]?.uid || ''])}
                onKeyUp={(evt) => {
                  if (evt.key === 'Enter') {
                    selection.set([menu?.items?.[0]?.uid || ''])
                  }
                }}
                tabIndex={0}
              >
                {menu?.items?.[0]?.name}
                <IconSvg src={iconChevronDown} />
              </DesktopNavItem>
            </DesktopNavBar>
            <DesktopNavActions>
              {/* <SearchField formControl={{ sx: { width: '400px' } }} /> */}
              <Fab
                href={`/${store}/service`}
                aria-label={t`Customer Service`}
                size='large'
                color='inherit'
              >
                <IconSvg src={iconCustomerService} size='large' />
              </Fab>
              <Fab
                href={`/${store}/wishlist`}
                aria-label={t`Wishlist`}
                size='large'
                color='inherit'
              >
                <IconSvg src={iconHeart} size='large' />
              </Fab>
              <Fab href={`/${store}/account`} aria-label={t`Account`} size='large' color='inherit'>
                <IconSvg src={iconCustomerService} size='large' />
              </Fab>
              <PlaceholderFab />
            </DesktopNavActions>

            <MobileTopRight>{/* <SearchFab size='responsiveMedium' /> */}</MobileTopRight>
          </>
        }
        footer={<Footer socialLinks={footerBlock?.content} store={store} />}
        cartFab={
          <Fab href={`/${store}/cart`} color='secondary' size='large' aria-label={t`Cart`}>
            🛒
          </Fab>
        }
        menuFab={
          <Fab onClick={() => selection.set([])} aria-label={t`Open Menu`} size='large'>
            <IconSvg src={iconMenu} size='large' />
          </Fab>
        }
      >
        {children}
      </LayoutDefaultRsc>
    </>
  )
}
