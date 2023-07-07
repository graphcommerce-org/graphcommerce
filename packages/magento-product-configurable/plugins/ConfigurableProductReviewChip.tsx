import { ProductReviewChipProps } from '@graphcommerce/magento-review'
import type { PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductShortDescription'
export const exported = '@graphcommerce/magento-product'

function ConfigurableProductReviewChip(
  props: PluginProps<ProductReviewChipProps & { index?: number }>,
) {
  const { Prev, rating, url_key, index = 0, ...rest } = props
  const { configured } = useConfigurableOptionsSelection({ url_key, index })
  const configurableOption = configured?.configurable_product_options_selection?.variant

  return <Prev rating={configurableOption?.rating_summary ?? rating} {...rest} />
}
export const Plugin = ConfigurableProductReviewChip
