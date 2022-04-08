import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GUEST_WISHLIST_STORAGE_NAME,
  GetWishlistProductsDocument,
  WishlistItems,
  GetGuestWishlistProductsDocument,
} from '@graphcommerce/magento-wishlist'
import {
  GetStaticProps,
  iconHeart,
  FullPageMessage,
  Button,
  LayoutTitle,
  IconSvg,
  LayoutOverlayHeader,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import { LayoutOverlay, LayoutOverlayProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function WishlistPage(props: Props) {
  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  let wishlistItems
  let productListClasses
  const [wishlistGuestItems, setWishlistGuestItems] = useState([])

  useEffect(() => {
    wishlistItems = JSON.parse(localStorage.getItem(GUEST_WISHLIST_STORAGE_NAME) || '[]')
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

  if (loadingGuestItems || loadingCustomerItems) {
    return null
  }

  return (
    <>
      <PageMeta title={t`Wishlist`} metaDescription={t`Wishlist`} metaRobots={['noindex']} />
      <NoSsr>
        <LayoutOverlayHeader>
          <LayoutTitle component='span' size='small'>
            <Trans>Wishlist</Trans>
          </LayoutTitle>
        </LayoutOverlayHeader>

        <Container maxWidth='md'>
          {wishlistItems === undefined || wishlistItems.length == 0 ? (
            <FullPageMessage
              title={t`Your wishlist is empty`}
              icon={<IconSvg src={iconHeart} size='xxl' />}
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
              <LayoutTitle icon={iconHeart}>
                <Trans>Wishlist</Trans>
              </LayoutTitle>
              <Container maxWidth='md'>
                <AnimatePresence initial={false}>
                  <WishlistItems items={wishlistItems} />
                </AnimatePresence>
              </Container>
            </>
          )}
        </Container>
      </NoSsr>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'bottom',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom', variantSm: 'bottom' },
}
WishlistPage.pageOptions = pageOptions

export default WishlistPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
