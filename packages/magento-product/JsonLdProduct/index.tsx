import Head from 'next/head'
import React from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
import { AggregateOffer, Product } from 'schema-dts'
import { ProductReviewFragment } from '../ProductReview/ProductReview.gql'

type ProductJsonLdProps = Pick<
  Product,
  'name' | 'sku' | 'description' | 'image' | 'identifier' | 'category'
> &
  Pick<AggregateOffer, 'priceCurrency' | 'lowPrice' | 'highPrice'> &
  ProductReviewFragment

export default function JsonLdProduct(props: ProductJsonLdProps) {
  const {
    name,
    sku,
    image,
    identifier,
    category,
    description,
    highPrice,
    lowPrice,
    priceCurrency,
    reviews,
  } = props

  // calculate average rating.
  // divide sum of ratings by 0.5, because by default ratings go from 0-10 instead of required 0-5
  // divide by 10%, because ther result is between 0-50 instead of required 0-5
  const ratingValue =
    reviews?.items?.length > 0
      ? (Math.round(
          reviews.items.reduce(
            (acc, current) => acc + (current ?? { average_rating: 1 }).average_rating,
            0,
          ) * 0.5,
        ) /
          reviews.items.length) *
        0.1
      : undefined

  return (
    <Head>
      <script
        key='product-jsonld-product'
        {...jsonLdScriptProps<Product>({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          sku,
          image,
          identifier,
          category,
          description: (description as string).replace(/(<([^>]+)>)/gi, ''),
          offerCount: 1,
          offers: {
            '@type': 'AggregateOffer',
            itemCondition: 'https://schema.org/NewCondition',
            priceCurrency,
            highPrice,
            lowPrice,
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            reviewCount: reviews.items.length > 0 ? reviews.items.length : undefined,
            ratingValue,
          },
          review: reviews.items.map((review) => ({
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: ((review?.average_rating || 0) * 0.5 * 0.1).toString(),
            },
            name: review?.summary,
            author: {
              '@type': 'Person',
              name: review?.nickname,
            },
            datePublished: review?.created_at,
            reviewBody: review?.text,
          })),
        })}
      />
    </Head>
  )
}
