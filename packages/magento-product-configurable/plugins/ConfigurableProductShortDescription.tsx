import type { ProductShortDescriptionProps } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { ConfigurableOptionsFragment } from '../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductShortDescription'
export const exported = '@graphcommerce/magento-product'

function ConfigurableProductShortDescription(
  props: PluginProps<
    ProductShortDescriptionProps & { product?: ConfigurableOptionsFragment; index?: number }
  >,
) {
  const { Prev, product, index = 0, short_description, ...rest } = props
  const { configured } = useConfigurableOptionsSelection({ url_key: product?.url_key, index })

  const isConfigurable = product?.__typename === 'ConfigurableProduct'

  const getConfigurableShortDescription =
    configured?.configurable_product_options_selection?.variant?.short_description
  const configurableShortDescription =
    isConfigurable && getConfigurableShortDescription?.html.length
      ? getConfigurableShortDescription
      : short_description

  return <Prev {...rest} short_description={configurableShortDescription} />
}
export const Plugin = ConfigurableProductShortDescription
