import { IconButton, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CartFab from '@reachdigital/magento-cart/CartFab'
import CustomerFab from '@reachdigital/magento-customer/AccountFab'
import SearchButton from '@reachdigital/magento-search/SearchButton'
import DesktopNavActions from '@reachdigital/next-ui/AppShell/DesktopNavActions'
import DesktopNavBar from '@reachdigital/next-ui/AppShell/DesktopNavBar'
import NextFullPageUi, {
  FullPageUiProps as NextFullPageUiProps,
} from '@reachdigital/next-ui/AppShell/FullPageUi'
import { MenuProps } from '@reachdigital/next-ui/AppShell/Menu'
import MenuFab from '@reachdigital/next-ui/AppShell/MenuFab'
import MenuFabSecondaryItem from '@reachdigital/next-ui/AppShell/MenuFabSecondaryItem'
import PageLink from 'next/link'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import React from 'react'
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

type FullPageUiProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<NextFullPageUiProps, 'menu' | 'logo' | 'actions' | 'classes'>

function FullPageUi(props: FullPageUiProps) {
  const { footer, menu: menuData = {}, children, ...uiProps } = props
  const classes = useStyles()

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

  return (
    <NextFullPageUi
      {...uiProps}
      header={
        <>
          <Logo />
          <DesktopNavBar {...menuProps} />
          <DesktopNavActions>
            <SearchButton classes={{ root: classes.navbarSearch }} />

            <PageLink href='/service/index'>
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
      <MenuFab {...menuProps} search={<SearchButton />}>
        <MenuFabSecondaryItem src='/icons/desktop_account.svg' type='image/svg+xml' href='/account'>
          Account
        </MenuFabSecondaryItem>
        <MenuFabSecondaryItem
          src='/icons/desktop_customer_service.svg'
          type='image/svg+xml'
          href='/service/index'
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
    </NextFullPageUi>
  )
}
FullPageUi.holdBackground = false

export default FullPageUi
