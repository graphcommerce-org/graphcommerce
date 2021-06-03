import JsonLd from '@reachdigital/next-ui/JsonLd/JsonLd'
import React from 'react'
import { Product } from 'schema-dts'
import { ProductImage } from '../../graphql'
import { JsonLdProductFragment } from './JsonLdProduct.gql'
import { JsonLdProductOfferFragment } from './JsonLdProductOffer.gql'
import { JsonLdProductReviewFragment } from './JsonLdProductReview.gql'

type JsonLdProductProps = JsonLdProductFragment

export function jsonLdProduct(props: JsonLdProductFragment): Product {
  const { name, sku, media_gallery, categories, description, url_key } = props

  return {
    '@type': 'Product',
    name: name ?? undefined,
    sku: sku ?? undefined,
    image: media_gallery
      ? media_gallery?.map((img) => (img as ProductImage)?.url ?? '')
      : undefined,
    category: categories?.[0]?.name ?? undefined,
    identifier: url_key ?? undefined,
    description: description?.html
      ? (description.html ?? '').replace(/(<([^>]+)>)/gi, '')
      : undefined,
  }
}

export function jsonLdProductOffer(props: JsonLdProductOfferFragment): Partial<Product> {
  const { price_range } = props

  return {
    offers: {
      '@type': 'AggregateOffer',
      itemCondition: 'https://schema.org/NewCondition',
      offerCount: 1,
      priceCurrency: price_range.minimum_price.regular_price.currency ?? undefined,
      highPrice: price_range?.minimum_price?.regular_price.value ?? undefined,
      lowPrice: price_range.minimum_price.final_price.value ?? undefined,
    },
  }
}

export function jsonLdProductReview(props: JsonLdProductReviewFragment): Partial<Product> {
  const { reviews, review_count, rating_summary } = props

  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      reviewCount: review_count, // reviews.items.length > 0 ? reviews.items.length : undefined,
      ratingValue: (rating_summary * 0.5 * 0.1).toString(),
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
  }
}

export default function JsonLdProduct(props: JsonLdProductProps) {
  return (
    <JsonLd<Product>
      item={{
        '@context': 'https://schema.org',
        ...jsonLdProduct(props),
        ...jsonLdProductOffer(props as unknown as JsonLdProductOfferFragment),
        ...jsonLdProductReview(props as unknown as JsonLdProductReviewFragment),
      }}
    />
  )
}
