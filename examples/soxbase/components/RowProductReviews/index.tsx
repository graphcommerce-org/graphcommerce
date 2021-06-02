import ProductReview, { ProductReviewProps } from '@reachdigital/magento-product/ProductReview'
import Row from '@reachdigital/next-ui/Row'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import React from 'react'
import { RowProductReviewsFragment } from './RowProductReviews.gql'

type RowProductReviewProps = RowProductReviewsFragment & Partial<ProductReviewProps>

export default function RowProductReviews(props: RowProductReviewProps) {
  const { title, reviews, ...product } = props

  if (!reviews || reviews?.items.length === 0) return null

  return (
    <Row maxWidth='md'>
      <SectionHeader labelLeft={title} />
      <ProductReview name={product.name ?? ''} reviews={reviews} />
    </Row>
  )
}
