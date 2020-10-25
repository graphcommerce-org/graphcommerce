import { useProductLink } from '@reachdigital/magento-product/ProductLink'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import Head from 'next/head'
import React from 'react'

export default function ProductPageMeta(props: GQLProductPageMetaFragment) {
  const { name, meta_title, meta_description, url_key, canonical_url } = props
  const productLink = useProductLink({ url_key, canonical_url, canonical: true })

  return (
    <>
      <PageMeta
        title={meta_title ?? name ?? ''}
        metaDescription={meta_description ?? ''}
        metaRobots='INDEX, FOLLOW'
      />
      <Head>
        <link rel='canonical' href={productLink} />
      </Head>
    </>
  )
}
