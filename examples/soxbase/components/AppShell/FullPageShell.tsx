import { useQuery } from '@apollo/client'
import { Fab, makeStyles, Theme } from '@material-ui/core'
import { CartFab } from '@reachdigital/magento-cart'
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
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconCustomerService, iconPersonAlt, iconStar } from '@reachdigital/next-ui/icons'
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
      [theme.breakpoints.up('sm')]: {
        minWidth: 130,
      },
    },
    fab: {
      width: responsiveVal(42, 56),
      height: responsiveVal(42, 56),
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

  const withMenu = menuData?.items && menuData?.items?.length > 0

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
    ],
  }

  if (withMenu) {
    menuProps.menu.push({ href: '/blog', children: 'Blog' })
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

          {withMenu && (
            <DesktopNavActions>
              {!router.pathname.startsWith('/search') && (
                <SearchButton onClick={onSearchStart} classes={{ root: classes.navbarSearch }} />
              )}

              <PageLink href='/service' passHref>
                <Fab
                  style={{ boxShadow: 'none' }}
                  aria-label='Account'
                  size='medium'
                  classes={{ root: classes.fab }}
                >
                  <SvgImage src={iconCustomerService} alt='Customer Service' loading='eager' />
                </Fab>
              </PageLink>

              <CustomerFab />
            </DesktopNavActions>
          )}
        </>
      }
    >
      <MenuFab {...menuProps} search={<SearchButton onClick={onSearchStart} />}>
        <MenuFabSecondaryItem
          icon={<SvgImage src={iconPersonAlt} size='small' alt='Account' />}
          href='/account'
        >
          Account
        </MenuFabSecondaryItem>
        <MenuFabSecondaryItem
          icon={<SvgImage src={iconCustomerService} size='small' alt='Customer Service' />}
          href='/service'
        >
          Customer Service
        </MenuFabSecondaryItem>
        <MenuFabSecondaryItem
          icon={<SvgImage src={iconStar} size='small' alt='Wishlist' />}
          href='/wishlist'
        >
          Wishlist
        </MenuFabSecondaryItem>
      </MenuFab>

      {withMenu && <CartFab style={{ boxShadow: 'none' }} />}

      {children}

      <Footer footer={footer} />
    </FullPageShellBase>
  )
}

export default FullPageShell
