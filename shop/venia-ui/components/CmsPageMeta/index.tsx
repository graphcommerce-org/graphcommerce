import React from 'react'
import Head from 'next/head'

export default function CmsPageMeta(props: GQLCmsPageMetaFragment) {
  const { title, meta_title, meta_description } = props
  return (
    <Head>
      <title>{meta_title ?? title}</title>
      {meta_description && <meta name='description' content={meta_description} />}
      <meta name='robots' content='INDEX, FOLLOW' />
    </Head>
  )
}
