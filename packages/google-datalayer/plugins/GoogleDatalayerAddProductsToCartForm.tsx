import {
  AddProductsToCartFormProps,
  findAddedItems,
  toUserErrors,
} from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { nonNullable } from '@graphcommerce/next-ui'
import { sendEvent } from '../api/sendEvent'
import { cartItemToDatalayerItem } from '../mapping/cartItemToDatalayerItem/cartItemToDatalayerItem'
import { datalayerItemsToCurrencyValue } from '../mapping/datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'

export const component = 'AddProductsToCartForm'
export const exported = '@graphcommerce/magento-product'

/** When a product is added to the Cart, send a Google Analytics event */
function GoogleDatalayerAddProductsToCartForm(props: PluginProps<AddProductsToCartFormProps>) {
  const { Prev, onComplete, ...rest } = props

  return (
    <Prev
      {...rest}
      onComplete={(result, variables) => {
        const { data, errors } = result
        const addedItems = findAddedItems(data, variables)

        const items = addedItems
          .map(({ itemVariable, itemInCart }) => {
            if (!itemInCart) return null
            return { ...cartItemToDatalayerItem(itemInCart), quantity: itemVariable.quantity }
          })
          .filter(nonNullable)

        const userErrors = toUserErrors(result.data)
        if ((errors && errors.length > 0) || userErrors.length > 0) {
          sendEvent('add_to_cart_error', {
            userErrors: userErrors?.map((e) => e.message),
            errors: errors?.map((e) => e.message),
            variables,
          })
        }

        if (items.length > 0) {
          sendEvent('add_to_cart', { ...datalayerItemsToCurrencyValue(items), items })
        }

        return onComplete?.(result, variables)
      }}
    />
  )
}

export const Plugin = GoogleDatalayerAddProductsToCartForm
