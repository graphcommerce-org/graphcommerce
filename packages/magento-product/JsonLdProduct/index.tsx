import Head from 'next/head'
import React from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Product } from 'schema-dts'

type ProductJsonLdProps = Pick<
  Product,
  'name' | 'sku' | 'description' | 'image' | 'identifier' | 'category'
>

export default function JsonLdProduct(props: ProductJsonLdProps) {
  const { description, ...productJsonLdProps } = props

  return (
    <Head>
      <script
        key='product-jsonld-product'
        {...jsonLdScriptProps<Product>({
          '@context': 'https://schema.org',
          '@type': 'Product',
          ...productJsonLdProps,
          description: (description as string).replace(/(<([^>]+)>)/gi, ''),
        })}
      />
    </Head>
  )
}
