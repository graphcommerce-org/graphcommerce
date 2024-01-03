import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { dataLayerAddToCart } from '../events/dataLayerAddToCart/dataLayerAddToCart'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'googleTagmanagerId'

/** When a product is added to the Cart, send a Google Analytics event */
function GtmAddProductsToCartForm(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, onComplete, ...rest } = props

  return (
    <Prev
      {...rest}
      onComplete={(data, variables) => {
        dataLayerAddToCart(data, variables)
        return onComplete?.(data, variables)
      }}
    />
  )
}

export const Plugin = GtmAddProductsToCartForm
