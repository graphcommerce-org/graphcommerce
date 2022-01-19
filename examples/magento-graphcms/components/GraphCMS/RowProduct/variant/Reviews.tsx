import { useQuery } from '@graphcommerce/graphql'
import { ProductReviews, ProductReviewsProps } from '@graphcommerce/magento-review'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Row, SectionContainer } from '@graphcommerce/next-ui'
import { RowProductFragment } from '../RowProduct.gql'

type ReviewsProps = RowProductFragment & Partial<ProductReviewsProps>

export function Reviews(props: ReviewsProps) {
  const { title, reviews, url_key, review_count, sku } = props

  const { data, loading } = useQuery(StoreConfigDocument)

  if (!reviews || loading) return null

  if (!data?.storeConfig?.product_reviews_enabled) return null

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
