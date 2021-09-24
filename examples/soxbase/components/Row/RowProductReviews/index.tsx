import { useQuery } from '@apollo/client'
import { ProductReviews, ProductReviewsProps } from '@graphcommerce/magento-review'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Row, SectionContainer } from '@graphcommerce/next-ui'
import React from 'react'
import { RowProductReviewsFragment } from './RowProductReviews.gql'

type RowProductReviewsProps = RowProductReviewsFragment & Partial<ProductReviewsProps>

export default function RowProductReviews(props: RowProductReviewsProps) {
  const { title, reviews, url_key, review_count, sku } = props

  const { data, loading } = useQuery(StoreConfigDocument)

  if (!reviews || loading) return null

  if (!data?.storeConfig?.product_reviews_enabled) return <></>

  return (
    <Row maxWidth='md' id='reviews'>
      <SectionContainer
        labelLeft={
          <>
            {title} ({review_count})
          </>
        }
      >
        <ProductReviews
          reviews={reviews}
          url_key={url_key ?? ''}
          sku={sku}
          review_count={review_count ?? 0}
        />
      </SectionContainer>
    </Row>
  )
}
