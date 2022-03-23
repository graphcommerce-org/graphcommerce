import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'

import { WishlistProductsDocument } from '@graphcommerce/magento-wishlist'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
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
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'
import Link from 'next/link'
import ProductListItems from '../../components/ProductListItems/ProductListItems'
import useProductListStyles from '../../components/ProductListItems/useProductListStyles'

type Props = any
type GetPageStaticProps = GetStaticProps<FullPageShellProps>

function WishlistPage(props: Props) {
  // let guestWishlistItems = process.browser ? localStorage?.wishlist : '[]'
  // guestWishlistItems = JSON.parse(guestWishlistItems)

  // const { data, loading, error } = useQuery(WishlistProductsDocument, {
  //   fetchPolicy: 'cache-and-network',
  //   ssr: false,
  //   variables: {
  //     filters: { sku: { in: guestWishlistItems } },
  //   },
  // })
  // const productListClasses = useProductListStyles({ count: data?.products?.items?.length ?? 0 })
  // const totalWishlistProducts = data?.products?.items?.length ?? 0

  const totalWishlistProducts = null

  // if (loading) return <div />
  // if (error) return <div>oops</div>

  return (
    <>
      <PageMeta title={t`Wishlist`} metaDescription={t`Wishlist`} metaRobots={['noindex']} />

      <SheetShellHeader>
        <Title component='span' size='small'>
          <Trans>Wishlist</Trans>
        </Title>
      </SheetShellHeader>

      <Container maxWidth='md'>
        <NoSsr>
          {/* <ProductListItems
            items={data?.products?.items}
            classes={productListClasses}
            loadingEager={1}
          /> */}
          {totalWishlistProducts === null ? (
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
            ''
          )}
        </NoSsr>
      </Container>
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
