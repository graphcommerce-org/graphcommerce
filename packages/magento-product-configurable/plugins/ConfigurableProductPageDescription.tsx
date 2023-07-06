import type {
  ProductPageDescriptionProps,
  ProductShortDescriptionProps,
} from '@graphcommerce/magento-product'
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
  const { Prev, url_key, __typename, index = 0, description, ...rest } = props
  const { configured } = useConfigurableOptionsSelection({ url_key, index })

  const getConfigurableDescription =
    configured?.configurable_product_options_selection?.variant?.description
  const configurableDescription = getConfigurableDescription?.html.length
    ? getConfigurableDescription
    : description

  return <Prev description={configurableDescription} __typename={__typename} {...rest} />
}
export const Plugin = ConfigurableProductPageDescription
