import { GQLCategoryMetaFragment } from 'generated/graphql'
import Head from 'next/head'
import React from 'react'

export default function CategoryMeta(props: GQLCategoryMetaFragment) {
  const { name, meta_title, meta_description } = props

  return (
    <Head>
      {(meta_title || name) && <title>{meta_title ?? name}</title>}
      {meta_description && <meta name='description' content={meta_description} />}
      <meta name='robots' content='INDEX, FOLLOW' />
    </Head>
  )
}
