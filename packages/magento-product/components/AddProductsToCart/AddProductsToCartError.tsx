import { useFormState } from '@graphcommerce/ecommerce-ui'
import { FormHelperText } from '@mui/material'
import { AddToCartItemSelector, useFormAddProductsToCart } from './useFormAddProductsToCart'

type AddProductsToCartErrorProps = {
  children?: React.ReactNode
} & AddToCartItemSelector

export function AddProductsToCartError(props: AddProductsToCartErrorProps) {
  const { children, index = 0 } = props
  const { control } = useFormAddProductsToCart()
  const formState = useFormState({ control })
  const errorMsg = formState.errors.cartItems?.[index]?.sku?.message

  if (errorMsg)
    return (
      <FormHelperText error sx={{ mt: 0, lineHeight: '1.3' }}>
        {errorMsg}
      </FormHelperText>
    )

  return <>{children}</>
}
