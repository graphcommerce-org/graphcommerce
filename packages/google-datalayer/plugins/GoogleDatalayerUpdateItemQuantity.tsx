import type { UpdateItemQuantityProps } from '@graphcommerce/magento-cart-items'
import { PluginProps } from '@graphcommerce/next-config'
import { event } from '../events/event'

export const component = 'UpdateItemQuantity'
export const exported =
  '@graphcommerce/magento-cart-items/components/UpdateItemQuantity/UpdateItemQuantity'

/**
 * When a product is added to the Cart, by using the + button on cart page, send a Google Analytics
 * event
 */
function GoogleDatalayerUpdateItemQuantity(props: PluginProps<UpdateItemQuantityProps>) {
  const { Prev, formOptions, quantity, ...rest } = props

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

          if (!itemInCart || diffQuantity === 0) return original

          const rowPrice = itemInCart?.prices?.row_total_including_tax.value ?? 1
          const rowQuantity = itemInCart?.quantity ?? 1
          const { product, prices } = itemInCart

          event(diffQuantity < 0 ? 'remove_from_cart' : 'add_to_cart', {
            currency: itemInCart?.prices?.price.currency,
            value: (rowPrice / rowQuantity) * absQuantity,
            items: [
              {
                item_id: product.sku,
                item_name: product.name,
                currency: prices?.price.currency,
                price: rowPrice / rowQuantity,
                quantity: absQuantity,
                discount: prices?.discounts?.reduce(
                  (sum, discount) => sum + (discount?.amount?.value ?? 0) / rowQuantity,
                  0,
                ),
              },
            ],
          })

          return original
        },
      }}
    />
  )
}

export const Plugin = GoogleDatalayerUpdateItemQuantity
