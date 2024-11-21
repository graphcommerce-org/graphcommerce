import { useWatch } from '@graphcommerce/ecommerce-ui'
import { InContextMask } from '@graphcommerce/graphql'
import { Money } from '@graphcommerce/magento-store'
import { extendableComponent } from '@graphcommerce/next-ui'
import type { AddToCartItemSelector } from '../AddProductsToCart'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type { ProductPagePriceFragment } from './ProductPagePrice.gql'
import { getProductTierPrice } from './getProductTierPrice'
import type { UseCustomizableOptionPriceProps } from './useCustomizableOptionPrice'
import { useCustomizableOptionPrice } from './useCustomizableOptionPrice'

export type ProductPagePriceProps = { product: ProductPagePriceFragment } & AddToCartItemSelector &
  UseCustomizableOptionPriceProps

const { classes } = extendableComponent('ProductPagePrice', [
  'finalPrice',
  'discountPrice',
] as const)

export function ProductPagePrice(props: ProductPagePriceProps) {
  const { product, index = 0 } = props

  const { control } = useFormAddProductsToCart()
  const quantity = useWatch({ control, name: `cartItems.${index}.quantity` })
  const price =
    getProductTierPrice(product, quantity) ?? product.price_range.minimum_price.final_price

  const priceValue = useCustomizableOptionPrice(props)
  const regularPrice = product.price_range.minimum_price.regular_price

  return (
    <>
      {regularPrice.value !== price.value && (
        <InContextMask
          component='span'
          className={classes.discountPrice}
          skeleton={{ variant: 'text', sx: { width: '3em', transform: 'none' } }}
          sx={[{ textDecoration: 'line-through', color: 'text.disabled', marginRight: '8px' }]}
        >
          <Money {...regularPrice} />
        </InContextMask>
      )}
      <InContextMask
        component='span'
        skeleton={{ variant: 'text', sx: { width: '3em', transform: 'none' } }}
        className={classes.finalPrice}
      >
        <Money {...price} value={priceValue} />
      </InContextMask>
    </>
  )
}
