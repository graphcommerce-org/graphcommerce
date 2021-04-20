import { useQuery } from '@apollo/client'
import { IconButton, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CartFab from '@reachdigital/magento-cart/CartFab'
import CustomerFab from '@reachdigital/magento-customer/AccountFab'
import { SearchButton } from '@reachdigital/magento-search'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import DesktopNavActions from '@reachdigital/next-ui/AppShell/DesktopNavActions'
import DesktopNavBar from '@reachdigital/next-ui/AppShell/DesktopNavBar'
import FullPageShellBase, {
  FullPageShellBaseProps,
} from '@reachdigital/next-ui/AppShell/FullPageShellBase'
import { MenuProps } from '@reachdigital/next-ui/AppShell/Menu'
import MenuFab from '@reachdigital/next-ui/AppShell/MenuFab'
import MenuFabSecondaryItem from '@reachdigital/next-ui/AppShell/MenuFabSecondaryItem'
import PageLoadIndicator from '@reachdigital/next-ui/PageLoadIndicator'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import Footer from './Footer'
import Logo from './Logo'

const useStyles = makeStyles(
  (theme: Theme) => ({
    navbarSearch: {
      marginRight: theme.spacings.xxs,
      [theme.breakpoints.up('md')]: {
        minWidth: 130,
      },
    },
  }),
  { name: 'FullPageUI' },
)

export type FullPageShellProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<FullPageShellBaseProps, 'menu' | 'logo' | 'actions' | 'classes' | 'name'>

function FullPageShell(props: FullPageShellProps) {
  const { footer, menu: menuData = {}, children, ...uiProps } = props
  const classes = useStyles()

  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  const menuProps: MenuProps = {
    menu: [
      ...(menuData?.items?.map((item) => ({
        href: `/${item?.url_path}`,
        children: item?.name?.toLowerCase().includes('sale') ? (
          <span style={{ textTransform: 'uppercase', color: 'red' }}>{item.name}</span>
        ) : (
          item?.name ?? ''
        ),
      })) ?? []),
      { href: '/blog', children: 'Blog' },
    ],
  }

  const router = useRouter()
  const onSearchStart = useCallback(() => router.push('/search'), [])

  return (
    <FullPageShellBase
      {...uiProps}
      name={name}
      header={
        <>
          <Logo />
          <DesktopNavBar {...menuProps} />
          <DesktopNavActions>
            {!router.pathname.startsWith('/search') && (
              <SearchButton onClick={onSearchStart} classes={{ root: classes.navbarSearch }} />
            )}

            <PageLink href='/service' passHref>
              <IconButton aria-label='Account' color='inherit' size='medium'>
                <PictureResponsiveNext
                  src='/icons/desktop_customer_service.svg'
                  alt='Customer Service'
                  loading='eager'
                  width={32}
                  height={32}
                  type='image/svg+xml'
                />
              </IconButton>
            </PageLink>

            <CustomerFab>
              <PictureResponsiveNext
                src='/icons/desktop_account.svg'
                alt='Account'
                loading='eager'
                width={32}
                height={32}
                type='image/svg+xml'
              />
            </CustomerFab>
          </DesktopNavActions>
        </>
      }
    >
      <MenuFab {...menuProps} search={<SearchButton onClick={onSearchStart} />}>
        <MenuFabSecondaryItem src='/icons/desktop_account.svg' type='image/svg+xml' href='/account'>
          Account
        </MenuFabSecondaryItem>
        <MenuFabSecondaryItem
          src='/icons/desktop_customer_service.svg'
          type='image/svg+xml'
          href='/service'
        >
          Customer Service
        </MenuFabSecondaryItem>
        <MenuFabSecondaryItem
          src='/icons/desktop_wishlist.svg'
          type='image/svg+xml'
          href='/wishlist'
        >
          Wishlist
        </MenuFabSecondaryItem>
      </MenuFab>
      <CartFab style={{ boxShadow: 'none' }}>
        <PictureResponsiveNext
          src='/icons/desktop_shopping_bag.svg'
          alt='shopping bag'
          loading='eager'
          width={32}
          height={32}
          type='image/svg+xml'
        />
      </CartFab>

      {children}

      <Footer footer={footer} />
    </FullPageShellBase>
  )
}

export default FullPageShell
