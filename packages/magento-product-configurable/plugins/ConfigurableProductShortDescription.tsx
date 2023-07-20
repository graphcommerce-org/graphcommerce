import { mergeDeep } from '@graphcommerce/graphql'
import type { ProductShortDescription } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import React from 'react'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductShortDescription'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

function ConfigurableProductShortDescription(
  props: PluginProps<React.ComponentProps<typeof ProductShortDescription>>,
) {
  const { Prev, product, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key: product.url_key, index: 0 }).configured
    ?.configurable_product_options_selection?.variant

  return <Prev product={mergeDeep(product, variant)} {...rest} />
}
export const Plugin = ConfigurableProductShortDescription
