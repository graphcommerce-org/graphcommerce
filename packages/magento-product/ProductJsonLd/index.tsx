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

  return (
    <Head>
      <script
        key='product-jsonld'
        {...jsonLdScriptProps<Product>({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          sku,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}${url}`,
          image: media_gallery.map((img) => img.url),
          identifier: url_key,
          category: categories?.[0],
          review: reviews.items.map((review) => ({
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: (review.average_rating * 0.5).toString(),
            },
            name: review.summary,
            author: {
              '@type': 'Person',
              name: review.nickname,
            },
            datePublished: review.created_at,
            reviewBody: review.text,
          })),
          aggregateRating: {
            '@type': 'AggregateRating',
            reviewCount: review_count.toString(),
            ratingValue,
          },
          offers: {
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
