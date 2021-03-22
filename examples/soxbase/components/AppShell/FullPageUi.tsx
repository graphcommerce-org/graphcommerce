import { IconButton, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DesktopNavActions from '@reachdigital/magento-app-shell/DesktopNavActions'
import DesktopNavBar from '@reachdigital/magento-app-shell/DesktopNavBar'
import FabMenu from '@reachdigital/magento-app-shell/FabMenu'
import FabMenuSecondaryItem from '@reachdigital/magento-app-shell/FabMenuSecondaryItem'
import CartFab from '@reachdigital/magento-cart/CartFab'
import CustomerFab from '@reachdigital/magento-customer/AccountFab'
import SearchButton from '@reachdigital/magento-search/SearchButton'
import NextFullPageUi, {
  FullPageUiProps as NextFullPageUiProps,
} from '@reachdigital/next-ui/AppShell/FullPageUi'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
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
  const menu: NonNullable<FullPageUiProps['menu']> = {
    ...menuData,
    items: [...(menuData?.items ?? []), { name: 'Blog', url_path: 'blog', include_in_menu: 1 }],
  }

  return (
    <NextFullPageUi
      {...uiProps}
      header={
        <>
          <Logo />
          <DesktopNavBar menu={menu} />
          <DesktopNavActions>
            <SearchButton classes={{ root: classes.navbarSearch }} />

            <PageLink href='/faq/index'>
              <IconButton aria-label='Account' color='inherit' size='medium'>
                <img
                  src='/icons/desktop_customer_service.svg'
                  alt=''
                  width={32}
                  height={32}
                  loading='eager'
                />
              </IconButton>
            </PageLink>

            <CustomerFab>
              <img
                src='/icons/desktop_account.svg'
                alt='account'
                width={32}
                height={32}
                loading='eager'
              />
            </CustomerFab>
          </DesktopNavActions>
        </>
      }
    >
      <FabMenu
        menu={menu}
        cart={
          <CartFab
            style={{ boxShadow: 'none' }}
            icon={
              <img
                src='/icons/desktop_shopping_bag.svg'
                alt='shopping bag'
                width={32}
                height={32}
                loading='eager'
              />
            }
          />
        }
        search={<SearchButton />}
      >
        <FabMenuSecondaryItem iconSrc='/icons/desktop_account.svg' href='/account'>
          Account
        </FabMenuSecondaryItem>
        <FabMenuSecondaryItem iconSrc='/icons/desktop_customer_service.svg' href='/faq/index'>
          Customer Service
        </FabMenuSecondaryItem>
        <FabMenuSecondaryItem iconSrc='/icons/desktop_wishlist.svg' href='/wishlist'>
          Wishlist
        </FabMenuSecondaryItem>
      </FabMenu>
      {children}
      <Footer footer={footer} />
    </NextFullPageUi>
  )
}
FullPageUi.holdBackground = false

export default FullPageUi
