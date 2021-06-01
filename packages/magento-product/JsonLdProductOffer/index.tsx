import Head from 'next/head'
import React from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
import { AggregateOffer, Product } from 'schema-dts'

type ProductJsonLdProps = Pick<AggregateOffer, 'priceCurrency' | 'lowPrice' | 'highPrice'>

export default function JsonLdProductOffer(props: ProductJsonLdProps) {
  return (
    <Head>
      <script
        key='product-jsonld-offers'
        {...jsonLdScriptProps<Product>({
          '@context': 'https://schema.org',
          '@type': 'Product',
          offers: {
            '@type': 'AggregateOffer',
            itemCondition: 'https://schema.org/NewCondition',
            ...props,
          },
        })}
      />
    </Head>
  )
}
