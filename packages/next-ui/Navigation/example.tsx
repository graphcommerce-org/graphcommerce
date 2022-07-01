export function MyLayout() {
  const [navigationActive, setNavigationActive] = useState(false)

  return (
    <>
      <NavigationProvider
        onClose={() => setNavigationActive(false)}
        items={[
          <SearchLink href='/search' sx={(theme) => ({ width: '100%', mb: theme.spacings.xs })}>
            <Trans id='Search...' />
          </SearchLink>,
          { id: 'home', name: 'Home', href: '/' },
          // ...useMagentoMenuToNavigation(menu),
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
          itemWidth='230px'
          // stretchColumns={false}
        />
      </NavigationProvider>

      <div>rest of the layout</div>
    </>
  )
}
