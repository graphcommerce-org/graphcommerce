import type { ProductPageDescriptionProps } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { ConfigurableOptionsFragment } from '../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPageDescription'
export const exported = '@graphcommerce/magento-product'

function ConfigurableProductPageDescription(
  props: PluginProps<
    ProductPageDescriptionProps & Partial<ConfigurableOptionsFragment> & { index?: number }
  >,
) {
  const { Prev, url_key, __typename, index = 0, description, name, ...rest } = props
  const { configured } = useConfigurableOptionsSelection({ url_key, index })

  const variant = configured?.configurable_product_options_selection?.variant
  const configurableDescription = variant?.description?.html.length
    ? variant?.description
    : description

  const productName = variant?.name ?? name

  return (
    <Prev
      description={configurableDescription}
      name={productName}
      __typename={__typename}
      {...rest}
    />
  )
}
export const Plugin = ConfigurableProductPageDescription
