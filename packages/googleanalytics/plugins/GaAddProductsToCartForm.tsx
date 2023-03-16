import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { gtagAddToCart } from '../events/gtagAddToCart/gtagAddToCart'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'googleAnalyticsId'

/** When a product is added to the Cart, send a Google Analytics event */
function GaAddProductsToCartForm(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, onComplete, ...rest } = props

  return (
    <Prev
      {...rest}
      onComplete={(data, variables) => {
        gtagAddToCart(data, variables)
        return onComplete?.(data, variables)
      }}
    />
  )
}

export const Plugin = GaAddProductsToCartForm
