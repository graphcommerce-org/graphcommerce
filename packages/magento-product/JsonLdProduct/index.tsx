import Head from 'next/head'
import React from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
import { AggregateOffer, Product } from 'schema-dts'

type ProductJsonLdProps = Pick<
  Product,
  'name' | 'sku' | 'description' | 'image' | 'identifier' | 'category'
> &
  Pick<AggregateOffer, 'priceCurrency' | 'lowPrice' | 'highPrice'>

export default function JsonLdProduct(props: ProductJsonLdProps) {
  const { description, highPrice, lowPrice, priceCurrency, ...productJsonLdProps } = props

  return (
    <Head>
      <script
        key='product-jsonld-product'
        {...jsonLdScriptProps<Product>({
          '@context': 'https://schema.org',
          '@type': 'Product',
          ...productJsonLdProps,
          description: (description as string).replace(/(<([^>]+)>)/gi, ''),
          offers: {
            '@type': 'AggregateOffer',
            itemCondition: 'https://schema.org/NewCondition',
            priceCurrency,
            highPrice,
            lowPrice,
          },
        })}
      />
    </Head>
  )
}
