import { useQuery } from '@apollo/client'
import { Fab, makeStyles, Theme } from '@material-ui/core'
import { CartFab } from '@reachdigital/magento-cart'
import { CustomerFab, CustomerMenuFabItem } from '@reachdigital/magento-customer'
import { SearchButton } from '@reachdigital/magento-search'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import {
  FullPageShellBase,
  FullPageShellBaseProps,
  DesktopNavActions,
  DesktopNavBar,
  MenuProps,
  MenuFab,
  MenuFabSecondaryItem,
  responsiveVal,
  SvgImage,
  iconCustomerService,
  iconHeart,
} from '@reachdigital/next-ui'
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
                <SvgImage src={iconCustomerService} alt='Customer Service' />
              </Fab>
            </PageLink>

            <CustomerFab guestHref='/account/signin' authHref='/account' />
          </DesktopNavActions>
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

      <CartFab style={{ boxShadow: 'none' }} />

      {children}

      <Footer footer={footer} />
    </FullPageShellBase>
  )
}

export default FullPageShell
