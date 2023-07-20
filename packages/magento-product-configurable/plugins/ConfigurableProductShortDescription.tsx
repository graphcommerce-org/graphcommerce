import { mergeDeep } from '@graphcommerce/graphql'
import type { AddToCartItemSelector, ProductShortDescription } from '@graphcommerce/magento-product'
import type { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import React from 'react'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductShortDescription'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

type PluginType = ReactPlugin<typeof ProductShortDescription, AddToCartItemSelector>

const ConfigurableProductShortDescription: PluginType = (props) => {
  const { Prev, product, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key: product.url_key, index: 0 }).configured
    ?.configurable_product_options_selection?.variant

  return <Prev product={variant ? mergeDeep(product, variant) : product} {...rest} />
}

export const Plugin = ConfigurableProductShortDescription
