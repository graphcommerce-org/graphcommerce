import type { ProductShortDescriptionProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import type { ConfigurableOptionsFragment } from '../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductShortDescription'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

function ConfigurableProductShortDescription(
  props: PluginProps<ProductShortDescriptionProps & Partial<ConfigurableOptionsFragment>>,
) {
  const { Prev, url_key, short_description, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key, index: 0 }).configured
    ?.configurable_product_options_selection?.variant

  return (
    <Prev
      short_description={
        variant?.short_description?.html.length ? variant?.short_description : short_description
      }
      {...rest}
    />
  )
}
export const Plugin = ConfigurableProductShortDescription
