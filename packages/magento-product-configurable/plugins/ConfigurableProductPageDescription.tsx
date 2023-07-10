import type { ProductPageDescriptionProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { ConfigurableOptionsFragment } from '../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPageDescription'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.description'

function ConfigurableProductPageDescription(
  props: PluginProps<
    ProductPageDescriptionProps & Partial<ConfigurableOptionsFragment> & { index?: number }
  >,
) {
  const { Prev, url_key, index = 0, description, name, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key, index }).configured
    ?.configurable_product_options_selection?.variant

  return (
    <Prev
      description={variant?.description?.html.length ? variant?.description : description}
      name={variant?.name ?? name}
      {...rest}
    />
  )
}
export const Plugin = ConfigurableProductPageDescription
