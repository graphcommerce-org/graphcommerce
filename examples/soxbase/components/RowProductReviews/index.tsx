import ProductReview, { ProductReviewProps } from '@reachdigital/magento-product/ProductReview'
import ProductReviews from '@reachdigital/next-ui/Row/ProductReviews'
import React from 'react'
import { RowProductReviewsFragment } from './RowProductReviews.gql'

type RowProductReviewProps = RowProductReviewsFragment & Partial<ProductReviewProps>

export default function RowProductReviews(props: RowProductReviewProps) {
  const { title, reviews } = props

  if (!reviews || reviews?.items.length === 0) return null

  return <ProductReviews title={title} reviews={<ProductReview reviews={reviews} />} />
}
