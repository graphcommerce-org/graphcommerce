import { ProductReviews, ProductReviewsProps } from '@graphcommerce/magento-review'
import { MagentoEnv } from '@graphcommerce/magento-store'
import { Row, SectionContainer } from '@graphcommerce/next-ui'
import { RowProductFragment } from '../RowProduct.gql'

type ReviewsProps = RowProductFragment & Partial<ProductReviewsProps>

export function Reviews(props: ReviewsProps) {
  if ((process.env as MagentoEnv).NEXT_PUBLIC_PRODUCT_REVIEWS_ENABLED !== '1') return null

  const { title, reviews, url_key, review_count, sku } = props

  if (!reviews) return null

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
