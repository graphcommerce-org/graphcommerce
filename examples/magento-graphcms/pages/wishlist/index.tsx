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

type Props = any;
type GetPageStaticProps = GetStaticProps<MinimalPageShellProps>

function WishlistPage({ pages }: Props) {
  const { data, loading, error } = useQuery(WishlistProductsDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
    variables: {
      filters: { sku: { eq: "GC-1087-SOCK"} },
    },
  })

  if (loading) return <div />
  if (error)
    return (
      <div>oops</div>
    )

  console.log(data);

  return (
    <>
      <PageMeta
        title={`Wishlist`}
        metaDescription={`Wishlist`}
        metaRobots={['noindex']}
      />

      <PageShellHeader>
        <Title component='span' size='small' icon={iconHeart}>
          Wishlist
        </Title>
      </PageShellHeader>

      <AppShellTitle icon={iconHeart}>
        Wishlist
      </AppShellTitle>

      <Container maxWidth='md'>
        <NoSsr>

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
  const staticClient = apolloClient(locale)
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({
    query: WishlistProductsDocument,
    variables: {
      filters: { sku: { eq: "GC-1087-SOCK"} },
    },
  })

  return {
    props: {
      ...(await page).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
