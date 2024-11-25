import type {
  AddToCartItemSelector,
  UseAddProductsToCartActionProps,
} from '@graphcommerce/magento-product'
import {
  AddProductsToCartButton,
  AddProductsToCartQuantity,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product'
import type { InputMaybe } from '@graphcommerce/next-config'
import { Box } from '@mui/material'

type AddWishlistItemToCartProps = UseAddProductsToCartActionProps &
  AddToCartItemSelector & { selectedOptions?: InputMaybe<string[]> | undefined }

export function AddWishlistItemToCart(props: AddWishlistItemToCartProps) {
  const { product, selectedOptions, index = 0, sku } = props
  const { setValue } = useFormAddProductsToCart()

  return (
    <Box sx={{ display: 'flex' }}>
      <AddProductsToCartQuantity variant='standard' InputProps={{ disableUnderline: true }} />
      <AddProductsToCartButton
        sku={sku}
        product={product}
        onClick={() => setValue(`cartItems.${index}.selected_options`, selectedOptions)}
        color='primary'
        variant='text'
        size='medium'
      />
    </Box>
  )
}
