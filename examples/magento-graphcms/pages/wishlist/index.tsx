import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  SheetShellHeader,
  Title,
  iconHeart,
  FullPageMessage,
  SvgImageSimple,
  Button,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'
import Link from 'next/link'

import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { GetWishlistProductsDocument } from '@graphcommerce/magento-wishlist'
import { GetGuestWishlistProductsDocument } from '@graphcommerce/magento-wishlist'
import ProductListItems from '../../components/ProductListItems/ProductListItems'
import useProductListStyles from '../../components/ProductListItems/useProductListStyles'

type Props = any
type GetPageStaticProps = GetStaticProps<FullPageShellProps>

function WishlistPage(props: Props) {
  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid
  const GUEST_WISHLIST = 'guest-wishlist'

  let wishlistItems, productListClasses
  const [wishlistGuestItems, setWishlistGuestItems] = useState([])

  useEffect(() => {
    wishlistItems = JSON.parse(localStorage.getItem(GUEST_WISHLIST) || '[]')
    if (wishlistGuestItems.length == 0) {
      if (wishlistItems.length) {
        setWishlistGuestItems(wishlistItems)
      }
    }
  })

  const { data: GetCustomerWishlistData, loading: loadingCustomerItems } = useQuery(
    GetWishlistProductsDocument,
    {
      skip: !isLoggedIn,
      ssr: false,
    },
  )

  const { data: productGuestItems, loading: loadingGuestItems } = useQuery(
    GetGuestWishlistProductsDocument,
    {
      ssr: false,
      variables: {
        filters: { sku: { in: wishlistGuestItems } },
      },
      skip: wishlistGuestItems.length == 0,
    },
  )

  if (isLoggedIn) {
    wishlistItems =
      GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items.map(
        (item) => item?.product,
      ) || []
  } else {
    wishlistItems = productGuestItems?.products?.items
  }

  productListClasses = useProductListStyles({
    count: wishlistItems?.length ?? 0,
  })

  if (loadingGuestItems || loadingCustomerItems) {
    return null
  } else {
    console.log()
    console.dir(wishlistItems)
  }

  return (
    <>
      <PageMeta title={t`Wishlist`} metaDescription={t`Wishlist`} metaRobots={['noindex']} />
      <NoSsr>
        <SheetShellHeader>
          <Title component='span' size='small'>
            <Trans>Wishlist</Trans>
          </Title>
        </SheetShellHeader>

        <Container maxWidth='md'>
          {wishlistItems === undefined || wishlistItems.length == 0 ? (
            <FullPageMessage
              title={t`Your wishlist is empty`}
              icon={<SvgImageSimple src={iconHeart} size='xxl' />}
              button={
                <Link href='/' passHref>
                  <Button variant='contained' color='primary' size='large'>
                    <Trans>Continue shopping</Trans>
                  </Button>
                </Link>
              }
            >
              <Trans>Discover our collection and add items to your wishlist!</Trans>
            </FullPageMessage>
          ) : (
            <>
              <FullPageMessage
                title={t`Wishlist`}
                icon={<SvgImageSimple src={iconHeart} size='xl' />}
              ></FullPageMessage>
              <ProductListItems
                items={wishlistItems}
                classes={productListClasses}
                loadingEager={1}
              />
            </>
          )}
        </Container>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'bottom',
  SharedComponent: SheetShell,
}
WishlistPage.pageOptions = pageOptions

export default WishlistPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
    },
  }
}
