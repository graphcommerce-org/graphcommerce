import PageMeta from '@reachdigital/magento-store/PageMeta'
import Head from 'next/head'
import React from 'react'
import { useProductLink } from '../ProductLink'
import { ProductPageMetaFragment } from './ProductPageMeta.gql'

export default function ProductPageMeta(props: ProductPageMetaFragment) {
  const { name, meta_title, meta_description, url_key, __typename } = props
  const productLink = useProductLink({ url_key, __typename, canonical: true })

  return (
    <>
      <PageMeta title={meta_title ?? name ?? ''} metaDescription={meta_description ?? ''} />
      <Head>
        <link rel='canonical' href={productLink} />
      </Head>
    </>
  )
}
