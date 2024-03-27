import { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { addToCart } from '../events/add_to_cart'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'

/** When a product is added to the Cart, send a Google Analytics event */
function GoogleDatalayerAddProductsToCartForm(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, onComplete, ...rest } = props

  return (
    <Prev
      {...rest}
      onComplete={(result, variables) => {
        addToCart(result, variables)
        return onComplete?.(result, variables)
      }}
    />
  )
}

export const Plugin = GoogleDatalayerAddProductsToCartForm
