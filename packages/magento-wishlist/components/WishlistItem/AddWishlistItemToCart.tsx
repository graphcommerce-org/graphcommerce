import {
  AddProductsToCartQuantity,
  AddProductsToCartButton,
  useFormAddProductsToCart,
  UseAddProductsToCartActionProps,
} from '@graphcommerce/magento-product'
import { InputMaybe } from '@graphcommerce/next-config'
import { IconSvg, iconChevronRight } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'

type AddWishlistItemToCartProps = UseAddProductsToCartActionProps & {
  selectedOptions?: InputMaybe<string[]> | undefined
}

export function AddWishlistItemToCart(props: AddWishlistItemToCartProps) {
  const { product, selectedOptions } = props
  const { setValue } = useFormAddProductsToCart()

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1' }}>
      <AddProductsToCartQuantity variant='standard' InputProps={{ disableUnderline: true }} />
      {product && (
        <AddProductsToCartButton
          product={product}
          onClick={() => setValue(`cartItems.${0}.selected_options`, selectedOptions)}
          color='primary'
          variant='text'
          size='medium'
          endIcon={<IconSvg src={iconChevronRight} />}
        />
      )}
    </Box>
  )
}
