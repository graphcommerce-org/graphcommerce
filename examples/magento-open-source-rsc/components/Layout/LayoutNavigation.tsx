'use client'

import {
  DarkLightModeMenuSecondaryItem,
  DesktopNavActions,
  DesktopNavBar,
  DesktopNavItem,
  iconChevronDown,
  iconCustomerService,
  iconHeart,
  IconSvg,
  MenuFabSecondaryItem,
  MobileTopRight,
  NavigationFab,
  NavigationOverlay,
  NavigationProvider,
  PlaceholderFab,
  useMemoDeep,
  useNavigationSelection,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Divider, Fab } from '@mui/material'
import { useParams, usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import type { LayoutQuery } from '../../graphql/Layout.gql'
import { CartFabRsc } from './CartFabRsc'
import { Footer } from './Footer'
import { LayoutDefaultRsc } from './LayoutDefaultRsc'
import { Logo } from './Logo'
import { magentoMenuToNavigation } from './magentoMenuToNavigation'

export type LayoutNavigationProps = {
  children: ReactNode
  menu?: LayoutQuery['menu']
  cmsBlocks?: LayoutQuery['cmsBlocks']
}

/**
 * Layout Navigation component for App Router Uses NavigationProvider and NavigationOverlay from
 * next-ui to match the Pages Router implementation
 */
export function LayoutNavigation(props: LayoutNavigationProps) {
  const { menu, children, cmsBlocks } = props

  const selection = useNavigationSelection()
  const pathname = usePathname()
  const params = useParams<{ store: string }>()
  const store = params.store

  const isHomePage = pathname === `/${store}` || pathname === `/${store}/`

  const footerBlock = cmsBlocks?.items?.find((item) => item?.identifier === 'footer_links_block')

  return (
    <>
      <NavigationProvider
        selection={selection}
        items={useMemoDeep(
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
            <Divider key='divider' sx={(theme) => ({ my: theme.spacings.xs })} />,
            <MenuFabSecondaryItem
              key='account'
              icon={<IconSvg src={iconHeart} size='medium' />}
              href={`/${store}/account`}
            >
              <Trans>Account</Trans>
            </MenuFabSecondaryItem>,
            <MenuFabSecondaryItem
              key='service'
              icon={<IconSvg src={iconCustomerService} size='medium' />}
              href={`/${store}/service`}
            >
              <Trans>Customer Service</Trans>
            </MenuFabSecondaryItem>,
            <DarkLightModeMenuSecondaryItem key='darkmode' />,
          ],
          [menu, store],
        )}
      >
        <NavigationOverlay
          stretchColumns={false}
          variantSm='left'
          sizeSm='full'
          justifySm='start'
          itemWidthSm='70vw'
          variantMd='left'
          sizeMd='full'
          justifyMd='start'
          itemWidthMd='230px'
          mouseEvent='hover'
          itemPadding='md'
        />
      </NavigationProvider>

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
        cartFab={<CartFabRsc BadgeProps={{ color: 'secondary' }} />}
        menuFab={<NavigationFab onClick={() => selection.set([])} />}
      >
        {children}
      </LayoutDefaultRsc>
    </>
  )
}
