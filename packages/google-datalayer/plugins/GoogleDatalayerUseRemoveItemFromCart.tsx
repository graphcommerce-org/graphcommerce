import type { UpdateItemQuantityProps } from '@graphcommerce/magento-cart-items'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useSendEvent } from '../api/sendEvent'
import { cartItemToDatalayerItem } from '../mapping/cartItemToDatalayerItem/cartItemToDatalayerItem'
import { datalayerItemsToCurrencyValue } from '../mapping/datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-cart-items',
  type: 'component',
}

/**
 * When a product is added to the Cart, by using the + button on cart page, send a Google Analytics
 * event
 */
export function UpdateItemQuantity(props: PluginProps<UpdateItemQuantityProps>) {
  const { Prev, formOptions, quantity, ...rest } = props

  const sendEvent = useSendEvent()
  return (
    <Prev
      {...rest}
      quantity={quantity}
      formOptions={{
        ...formOptions,
        onComplete: (data, variables) => {
          const original = formOptions?.onComplete?.(data, variables)
          const itemInCart = data.data?.updateCartItems?.cart.items?.find(
            (item) => item?.uid === variables.uid,
          )

          const diffQuantity = variables.quantity - quantity
          const absQuantity = Math.abs(diffQuantity)

          if (!itemInCart?.quantity || diffQuantity === 0) return original

          const items = [{ ...cartItemToDatalayerItem(itemInCart, 0), quantity: absQuantity }]
          sendEvent(diffQuantity < 0 ? 'remove_from_cart' : 'add_to_cart', {
            ...datalayerItemsToCurrencyValue(items),
            items,
          })

          return original
        },
      }}
    />
  )
}
