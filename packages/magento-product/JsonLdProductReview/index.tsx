import Head from 'next/head'
import React from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Product } from 'schema-dts'
import { ProductReviewItemFragment } from '../ProductReview/ProductReviewItem.gql'

type JsonLdProductReviewProps = { name: string } & ProductReviewItemFragment

export default function JsonLdProductReview(props: JsonLdProductReviewProps) {
  const { name, average_rating, summary, nickname, created_at, text } = props

  return (
    <Head>
      <script
        key={`jsonld-product-review-${nickname}`}
        {...jsonLdScriptProps<Product>({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          review: {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: (average_rating * 0.5).toString(),
            },
            name: summary,
            author: {
              '@type': 'Person',
              name: nickname,
            },
            datePublished: created_at,
            reviewBody: text,
          },
        })}
      />
    </Head>
  )
}
