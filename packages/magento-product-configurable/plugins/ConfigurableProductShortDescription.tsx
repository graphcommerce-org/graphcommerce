import type { ProductShortDescriptionProps } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { ConfigurableOptionsFragment } from '../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductShortDescription'
export const exported = '@graphcommerce/magento-product'

function ConfigurableProductShortDescription(
  props: PluginProps<
    ProductShortDescriptionProps & Partial<ConfigurableOptionsFragment> & { index?: number }
  >,
) {
  const { Prev, url_key, __typename, index = 0, short_description, ...rest } = props
  const { configured } = useConfigurableOptionsSelection({ url_key, index })

  const getConfigurableShortDescription =
    configured?.configurable_product_options_selection?.variant?.short_description
  const configurableShortDescription = getConfigurableShortDescription?.html.length
    ? getConfigurableShortDescription
    : short_description

  return <Prev short_description={configurableShortDescription} __typename={__typename} {...rest} />
}
export const Plugin = ConfigurableProductShortDescription
