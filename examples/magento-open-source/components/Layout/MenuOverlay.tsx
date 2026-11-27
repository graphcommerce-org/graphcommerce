import { magentoMenuToNavigation } from '@graphcommerce/magento-category'
import { CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { StoreSwitcherMenuFabSecondaryItem } from '@graphcommerce/magento-store'
import { WishlistMenuFabItem } from '@graphcommerce/magento-wishlist'
import {
  DarkLightModeMenuSecondaryItem,
  iconCustomerService,
  iconHeart,
  IconSvg,
  MenuFabSecondaryItem,
  NavigationOverlay,
  NavigationProvider,
  useMemoDeep,
  type UseNavigationSelection,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Divider } from '@mui/material'
import type { LayoutQuery } from './Layout.gql'

export type MenuOverlayProps = LayoutQuery & { selection: UseNavigationSelection }

export function MenuOverlay(props: MenuOverlayProps) {
  const { menu, selection } = props

  return (
    <NavigationProvider
      selection={selection}
      items={useMemoDeep(
        () => [
          { id: 'home', name: <Trans>Home</Trans>, href: '/' },
          {
            id: 'manual-item-one',
            href: `/${menu?.items?.[0]?.children?.[0]?.url_path}`,
            name: menu?.items?.[0]?.children?.[0]?.name ?? '',
          },
          {
            id: 'manual-item-two',
            href: `/${menu?.items?.[0]?.children?.[1]?.url_path}`,
            name: menu?.items?.[0]?.children?.[1]?.name ?? '',
          },
          ...magentoMenuToNavigation(menu, true),
          <Divider key='divider' sx={(theme) => ({ my: theme.spacings.xs })} />,
          <CustomerMenuFabItem
            onClick={() => selection.set(false)}
            key='account'
            guestHref='/account/signin'
            authHref='/account'
          >
            <Trans>Account</Trans>
          </CustomerMenuFabItem>,
          <MenuFabSecondaryItem
            key='service'
            icon={<IconSvg src={iconCustomerService} size='medium' />}
            href='/service'
          >
            <Trans>Customer Service</Trans>
          </MenuFabSecondaryItem>,
          <WishlistMenuFabItem
            onClick={() => selection.set(false)}
            key='wishlist'
            icon={<IconSvg src={iconHeart} size='medium' />}
          >
            <Trans>Wishlist</Trans>
          </WishlistMenuFabItem>,
          <DarkLightModeMenuSecondaryItem key='darkmode' />,
          <StoreSwitcherMenuFabSecondaryItem key='store-switcher' />,
        ],
        [menu, selection],
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
  )
}
