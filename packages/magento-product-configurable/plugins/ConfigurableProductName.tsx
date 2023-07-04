import type { ProductNameFragment } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductName'
export const exported = '@graphcommerce/magento-product'

type ConfigurableProductNameProps = ProductNameFragment & {
  index?: number
  url_key?: string | undefined
}

function ConfigurableProductName(props: PluginProps<ConfigurableProductNameProps>) {
  const { Prev, name, url_key, index = 0, ...rest } = props
  const { configured } = useConfigurableOptionsSelection({ url_key, index })

  const configurableOption = configured?.configurable_product_options_selection?.variant

  return <Prev name={configurableOption?.name ?? name} {...rest} />
}
export const Plugin = ConfigurableProductName
