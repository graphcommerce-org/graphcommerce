import { ProductReviews } from '@reachdigital/magento-product-review'
import Row from '@reachdigital/next-ui/Row'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import React from 'react'
import { ProductReviewsProps } from '../../../../packages/magento-product-review/ProductReviews'
import { RowProductReviewsFragment } from './RowProductReviews.gql'

type RowProductReviewsProps = RowProductReviewsFragment & Partial<ProductReviewsProps>

export default function RowProductReviews(props: RowProductReviewsProps) {
  const { title, reviews, urlKey, reviewCount } = props

  if (!reviews || reviews?.items.length === 0) return null

  return (
    <Row maxWidth='md'>
      <SectionHeader
        labelLeft={
          <>
            {title} ({reviewCount})
          </>
        }
      />
      <ProductReviews reviews={reviews} urlKey={urlKey ?? ''} reviewCount={reviewCount ?? 0} />
    </Row>
  )
}
