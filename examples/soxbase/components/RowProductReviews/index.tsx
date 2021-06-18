import { useQuery } from '@apollo/client'
import { ProductReviews } from '@reachdigital/magento-product-review'
import Row from '@reachdigital/next-ui/Row'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import React from 'react'
import { ProductReviewsProps } from '../../../../packages/magento-product-review/ProductReviews'
import { StoreConfigDocument } from '../../../../packages/magento-store'
import { RowProductReviewsFragment } from './RowProductReviews.gql'

type RowProductReviewsProps = RowProductReviewsFragment & Partial<ProductReviewsProps>

export default function RowProductReviews(props: RowProductReviewsProps) {
  const { title, reviews, url_key, review_count, sku } = props

  const { data, loading } = useQuery(StoreConfigDocument)

  if (!reviews || reviews?.items.length === 0 || loading) return null

  if (!data?.storeConfig?.product_reviews_enabled) return <></>

  return (
    <Row maxWidth='md' id='reviews'>
      <SectionHeader
        labelLeft={
          <>
            {title} ({review_count})
          </>
        }
      />
      <ProductReviews
        reviews={reviews}
        url_key={url_key ?? ''}
        sku={sku}
        review_count={review_count ?? 0}
      />
    </Row>
  )
}
