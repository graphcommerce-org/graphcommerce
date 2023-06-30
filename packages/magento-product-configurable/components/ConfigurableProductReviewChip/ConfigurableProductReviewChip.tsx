import { ProductReviewChip } from '@graphcommerce/magento-review'
import { useConfigurableOptionsSelection } from '../../hooks'

export type ProductReviewChipProps = {
  url_key?: string | null
  rating_summary?: number
  index?: number
}

export function ConfigurableProductReviewChip(props: ProductReviewChipProps) {
  const { rating_summary, url_key, index = 0 } = props
  const { configured } = useConfigurableOptionsSelection({ url_key, index })

  const simpleProductRatingSummary =
    configured?.configurable_product_options_selection?.variant?.rating_summary

  return (
    <ProductReviewChip
      rating={simpleProductRatingSummary ?? rating_summary}
      reviewSectionId='reviews'
    />
  )
}
