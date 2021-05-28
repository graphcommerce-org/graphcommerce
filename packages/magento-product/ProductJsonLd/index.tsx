import Head from 'next/head'
import React from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Product } from 'schema-dts'
import { useProductLink } from '..'

type ProductJsonLdProps = any // todo: correct type

/*
  todo: support every product type
*/

export default function ProductJsonLd(props: ProductJsonLdProps) {
  const { name, categories, price_range, sku, url_key, reviews, review_count, media_gallery } =
    props

  const ratingValue = Math.round(
    (reviews.items.reduce(
      (acc, current) => (acc as number) + (current.average_rating as number),
      0,
    ) *
      0.5) /
      reviews.items.length,
  )
  const url = useProductLink(props)

  console.log('#####################')
  console.log('url', url)
  console.log(props)
  console.log('#####################')

  return (
    <Head>
      <script
        key='product-jsonld'
        {...jsonLdScriptProps<Product>({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          sku,
          url,
          image: media_gallery.map((img) => img.url),
          identifier: url_key,
          category: categories?.[0],
          review: reviews.items.map((review) => ({
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '4',
            },
            name: 'iPhone 6 Case Plus',
            author: {
              '@type': 'Person',
              name: 'Linus Torvalds',
            },
            datePublished: '2016-04-04',
            reviewBody:
              'I loved this case, it is strurdy and lightweight. Only issue is that it smudges.',
            publisher: {
              '@type': 'Organization',
              name: 'iPhone 6 Cases Inc.',
            },
          })),
          aggregateRating: {
            '@type': 'AggregateRating',
            reviewCount: review_count.toString(),
            ratingValue,
          },
          offers: {
            // configurable product specific?
            '@type': 'AggregateOffer',
            priceCurrency: price_range.minimum_price.final_price.currency,
            lowPrice: price_range.minimum_price.final_price.value,
            highPrice: price_range.maximum_price.final_price.value,
            itemCondition: 'https://schema.org/NewCondition',
          },
        })}
      />
    </Head>
  )
}
