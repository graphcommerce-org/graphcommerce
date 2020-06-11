import React from 'react'
import Head from 'next/head'

export default function CategoryMeta(props: GQLCategoryMetaFragment) {
  const { name, meta_title, meta_description } = props
  return (
    <Head>
      <title>{meta_title ?? name}</title>
      <meta name='description' content={meta_description} />
      <meta name='robots' content='INDEX, FOLLOW' />
    </Head>
  )
}
