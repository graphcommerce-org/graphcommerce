import Head from 'next/head'
import React from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Product } from 'schema-dts'
import { ProductReviewFragment } from '../ProductReview/ProductReview.gql'

type JsonLdAggregateRatingProps = { name: string } & ProductReviewFragment

export default function JsonLdAggregateRating(props: JsonLdAggregateRatingProps) {
  const { name, reviews } = props

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
        key='product-jsonld-reviews'
        {...jsonLdScriptProps<Product>({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          aggregateRating: {
            '@type': 'AggregateRating',
            reviewCount: reviews.items.length > 0 ? reviews.items.length : undefined,
            ratingValue,
          },
        })}
      />
    </Head>
  )
}
