import type { UpdateItemQuantityProps } from '@graphcommerce/magento-cart-items'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { event } from '../lib/event'

export const component = 'UpdateItemQuantity'
export const exported =
  '@graphcommerce/magento-cart-items/components/UpdateItemQuantity/UpdateItemQuantity'

/**
 * When a product is added to the Cart, by using the + button on cart page, send a Google Analytics
 * event
 */
function UpdateItemQuantity(props: PluginProps<UpdateItemQuantityProps>) {
  const { Prev, formOptions, quantity, ...rest } = props

  return (
    <Prev
      {...rest}
      quantity={quantity}
      formOptions={{
        ...formOptions,
        onComplete: (data, variables) => {
          const original = formOptions?.onComplete?.(data, variables)
          const diffQuantity = variables.quantity - quantity
          if (diffQuantity === 0) return original

          const itemId = variables.uid
          const addedItem = data.data?.updateCartItems?.cart.items?.find(
            (item) => item?.uid === itemId,
          )

          if (addedItem && addedItem.prices && addedItem.prices.row_total_including_tax.value) {
            // we need to manually calculate pricePerItemInclTax (https://github.com/magento/magento2/issues/33848)
            const pricePerItemInclTax =
              addedItem.prices.row_total_including_tax.value / addedItem.quantity
            const addToCartValue = pricePerItemInclTax * diffQuantity

            event('add_to_cart', {
              currency: addedItem?.prices?.price.currency,
              value: addToCartValue,
              items: [
                {
                  item_id: addedItem?.product.sku,
                  item_name: addedItem?.product.name,
                  currency: addedItem?.prices?.price.currency,
                  price: pricePerItemInclTax,
                  quantity: variables.quantity,
                  discount: addedItem?.prices?.discounts?.reduce(
                    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                    (sum, discount) => sum + (discount?.amount?.value ?? 0),
                    0,
                  ),
                },
              ],
            })
          }

          return original
        },
      }}
    />
  )
}

export const Plugin = UpdateItemQuantity
