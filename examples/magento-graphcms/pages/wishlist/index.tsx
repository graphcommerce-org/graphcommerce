import { useQuery } from '@apollo/client'
import { PageOptions } from '@graphcommerce/framer-next-pages'

import { WishlistProductsDocument } from '@graphcommerce/magento-wishlist'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  GetStaticProps,
  iconHeart,
  Title,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import PageShellHeader from '../../components/AppShell/PageShellHeader'
import apolloClient from '../../lib/apolloClient'
import ProductListItems from "../../components/ProductListItems/ProductListItems";
import useProductListStyles from "../../components/ProductListItems/useProductListStyles";

type Props = any;
type GetPageStaticProps = GetStaticProps<MinimalPageShellProps>

function WishlistPage(props: Props) {
  let guestWishlistItems = process.browser ? localStorage?.wishlist : '[]';
  guestWishlistItems = JSON.parse(guestWishlistItems);

  const { data, loading, error } = useQuery(WishlistProductsDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
    variables: {
      filters: { sku: { in: guestWishlistItems} },
    },
  })
  const productListClasses = useProductListStyles({ count: data?.products?.items?.length ?? 0 })
  const totalWishlistProducts = data?.products?.items?.length ?? 0

  if (loading) return <div />
  if (error)
    return (
      <div>oops</div>
    )

  return (
    <>
      <PageMeta
        title={`Wishlist`}
        metaDescription={`Wishlist`}
        metaRobots={['noindex']}
      />

      <PageShellHeader>
        <Title component='span' size='small' icon={iconHeart}>
          Wishlist ({totalWishlistProducts})
        </Title>
      </PageShellHeader>

      <AppShellTitle icon={iconHeart}>
        Wishlist ({totalWishlistProducts})
      </AppShellTitle>

      <Container maxWidth='md'>
        <NoSsr>
          <ProductListItems
            items={data?.products?.items}
            classes={productListClasses}
            loadingEager={1}
          />
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  SharedComponent: MinimalPageShell,
}

WishlistPage.pageOptions = pageOptions

export default WishlistPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
