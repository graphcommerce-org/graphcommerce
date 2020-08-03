import { GQLCmsPageMetaFragment, GQLStoreConfigPageMetaFragment } from 'generated/graphql'
import Head from 'next/head'
import React from 'react'

export default function CmsPageMeta(
  props: GQLCmsPageMetaFragment & GQLStoreConfigPageMetaFragment,
) {
  const {
    title,
    meta_title,
    meta_description,
    default_title,
    title_prefix,
    title_suffix,
    title_separator,
  } = props

  // todo migrate to PageMeta component that accepts the cms page meta as child
  let resultingTitle = title_prefix ?? ''
  const metaTitle = meta_title ?? title ?? default_title
  if (metaTitle) resultingTitle += ` ${metaTitle}`
  if (title_separator) resultingTitle += ` ${title_separator}`
  if (title_suffix) resultingTitle += ` ${title_suffix}`

  return (
    <Head>
      <title>{resultingTitle}</title>
      {meta_description && <meta name='description' content={meta_description} />}
      <meta name='robots' content='INDEX, FOLLOW' />
    </Head>
  )
}
