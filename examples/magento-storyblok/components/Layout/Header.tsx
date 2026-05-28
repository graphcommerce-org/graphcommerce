import { useCartEnabled } from '@graphcommerce/magento-cart'
import { CustomerFab } from '@graphcommerce/magento-customer'
import { SearchFab, SearchField } from '@graphcommerce/magento-search'
import { StoreSwitcherButton, StoreSwitcherFab } from '@graphcommerce/magento-store'
import { WishlistFab } from '@graphcommerce/magento-wishlist'
import {
  DesktopNavActions,
  DesktopNavBar,
  DesktopNavItem,
  iconChevronDown,
  iconCustomerService,
  iconHeart,
  IconSvg,
  MobileTopRight,
  PlaceholderFab,
  type UseNavigationSelection,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Fab } from '@mui/material'
import { productListRenderer } from '../ProductListItems/productListRenderer'
import { HeaderContainer } from './HeaderContainer'
import type { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'

export type HeaderProps = LayoutQuery & { selection: UseNavigationSelection }

export function Header(props: HeaderProps) {
  const { menu, selection } = props
  const cartEnabled = useCartEnabled()

  return (
    <HeaderContainer>
      <Logo />

      <DesktopNavBar>
        {menu?.items?.[0]?.children?.slice(0, 2).map((item) => (
          <DesktopNavItem key={item?.uid} href={`/${item?.url_path}`}>
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

        <DesktopNavItem href='/blog'>
          <Trans>Blog</Trans>
        </DesktopNavItem>
      </DesktopNavBar>

      <DesktopNavActions>
        <StoreSwitcherButton />
        <SearchField
          formControl={{ sx: { width: '400px' } }}
          searchField={{ productListRenderer }}
        />
        <Fab href='/service' aria-label={t`Customer Service`} size='large' color='inherit'>
          <IconSvg src={iconCustomerService} size='large' />
        </Fab>
        <WishlistFab
          icon={<IconSvg src={iconHeart} size='large' />}
          BadgeProps={{ color: 'secondary' }}
        />
        <CustomerFab
          guestHref='/account/signin'
          authHref='/account'
          BadgeProps={{ color: 'secondary' }}
        />
        {/* The placeholder exists because the CartFab is sticky but we want to reserve the space for the <CartFab /> */}
        {cartEnabled && <PlaceholderFab />}
      </DesktopNavActions>

      <MobileTopRight>
        <StoreSwitcherFab size='responsiveMedium' />
        <SearchFab size='responsiveMedium' />
      </MobileTopRight>
    </HeaderContainer>
  )
}
