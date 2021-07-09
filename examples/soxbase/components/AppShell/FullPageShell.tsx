import { useQuery } from '@apollo/client'
import { Fab, makeStyles, Theme } from '@material-ui/core'
import { CartFab } from '@reachdigital/magento-cart'
import { CustomerFab, CustomerMenuFabItem } from '@reachdigital/magento-customer'
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
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconCustomerService, iconHeart } from '@reachdigital/next-ui/icons'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import responsiveVal from '../../../../packages/next-ui/Styles/responsiveVal'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import Footer from './Footer'
import Logo from './Logo'

const useStyles = makeStyles(
  (theme: Theme) => ({
    navbarSearch: {
      marginRight: theme.spacings.xxs,
      width: responsiveVal(64, 172),
    },
    desktopActionsSpacer: {
      minWidth: 'unset',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
        minWidth: responsiveVal(224, 424),
      },
    },
  }),
  { name: 'FullPageShell' },
)

export type FullPageShellProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<FullPageShellBaseProps, 'menu' | 'logo' | 'actions' | 'classes' | 'name'>

function FullPageShell(props: FullPageShellProps) {
  const { footer, menu: menuData = {}, children, ...uiProps } = props
  const classes = useStyles()

  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  const menuItemsIncludeInMenu = menuData?.items?.filter((items) => items?.include_in_menu === 1)

  const menuProps: MenuProps = {
    menu: [
      ...(menuItemsIncludeInMenu?.map((item) => ({
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
          <div className={classes.desktopActionsSpacer} />
        </>
      }
    >
      <MenuFab {...menuProps} search={<SearchButton onClick={onSearchStart} />}>
        <CustomerMenuFabItem guestHref='/account/signin' authHref='/account'>
          Account
        </CustomerMenuFabItem>
        <MenuFabSecondaryItem
          icon={<SvgImage src={iconCustomerService} size='small' alt='Customer Service' />}
          href='/service'
        >
          Customer Service
        </MenuFabSecondaryItem>
        <MenuFabSecondaryItem
          icon={<SvgImage src={iconHeart} size='small' alt='Wishlist' />}
          href='/wishlist'
        >
          Wishlist
        </MenuFabSecondaryItem>
      </MenuFab>

      <DesktopNavActions>
        {!router.pathname.startsWith('/search') && (
          <SearchButton onClick={onSearchStart} classes={{ root: classes.navbarSearch }} />
        )}

        <PageLink href='/service' passHref>
          <Fab style={{ boxShadow: 'none' }} aria-label='Account' size='medium'>
            <SvgImage src={iconCustomerService} alt='Customer Service' loading='eager' />
          </Fab>
        </PageLink>
        <CustomerFab guestHref='/account/signin' authHref='/account' />
        <CartFab style={{ boxShadow: 'none' }} />
      </DesktopNavActions>

      {children}

      <Footer footer={footer} />
    </FullPageShellBase>
  )
}

export default FullPageShell
