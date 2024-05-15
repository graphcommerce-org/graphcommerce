import { useWatch } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { AddToCartItemSelector, useFormAddProductsToCart } from '../AddProductsToCart'
import { ProductPagePriceFragment } from './ProductPagePrice.gql'
import { getProductTierPrice } from './getProductTierPrice'
import {
  UseCustomizableOptionPriceProps,
  useCustomizableOptionPrice,
} from './useCustomizableOptionPrice'

export type ProductPagePriceProps = { product: ProductPagePriceFragment } & AddToCartItemSelector &
  UseCustomizableOptionPriceProps

const { classes } = extendableComponent('ProductPagePrice', ['root', 'discountPrice'] as const)

export function ProductPagePrice(props: ProductPagePriceProps) {
  const { product, index = 0 } = props

  const { control } = useFormAddProductsToCart()
  const quantity = useWatch({ control, name: `cartItems.${index}.quantity` })
  const price =
    getProductTierPrice(product, quantity) ?? product.price_range.minimum_price.final_price

  const priceValue = useCustomizableOptionPrice(props)

  if (product.__typename === 'GroupedProduct') return null

  return (
    <>
      {product.price_range.minimum_price.regular_price.value !== price.value && (
        <Box
          component='span'
          sx={{
            textDecoration: 'line-through',
            color: 'text.disabled',
            marginRight: '8px',
          }}
          className={classes.discountPrice}
        >
          <Money {...product.price_range.minimum_price.regular_price} />
        </Box>
      )}
      <Money {...price} value={priceValue} />
    </>
  )
}
