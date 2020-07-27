import Head from 'next/head'
import React from 'react'
import { useStoreConfigQuery } from 'generated/apollo'
import { useProductLink } from 'components/ProductLink'

export function ProductPageMeta(props: GQLProductPageMetaFragment) {
  const { name, meta_title, meta_description, url_key, canonical_url } = props
  const { data: storeConfigQuery } = useStoreConfigQuery()
  const productLink = useProductLink({ url_key, canonical_url })

  const title_prefix = storeConfigQuery?.storeConfig?.title_prefix
  const title_separator = storeConfigQuery?.storeConfig?.title_separator
  const default_title = storeConfigQuery?.storeConfig?.default_title
  const title_suffix = storeConfigQuery?.storeConfig?.title_suffix

  // todo migrate to PageMeta component that accepts the cms page meta as child
  let resultingTitle = title_prefix ?? ''
  const metaTitle = meta_title ?? name ?? default_title
  if (metaTitle) resultingTitle += ` ${metaTitle}`

  if (title_separator && title_suffix) resultingTitle += ` ${title_separator}`
  if (title_suffix) resultingTitle += ` ${title_suffix}`

  return (
    <Head>
      <title>{resultingTitle}</title>
      {meta_description && <meta name='description' content={meta_description} />}
      <meta name='robots' content='INDEX, FOLLOW' />
      <link rel='canonical' href={productLink} />
    </Head>
  )
}
