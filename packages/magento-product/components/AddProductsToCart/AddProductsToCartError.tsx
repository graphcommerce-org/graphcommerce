import { FormHelperText } from '@mui/material'
import { useFormAddProductsToCart } from './AddProductsToCartForm'

type AddProductsToCartErrorProps = {
  children?: React.ReactNode
}

export function AddProductsToCartError(props: AddProductsToCartErrorProps) {
  const { formState } = useFormAddProductsToCart()
  const errorMsg = formState.errors.cartItems?.[0].sku?.message

  const { children } = props

  if (errorMsg)
    return (
      <FormHelperText error sx={{ mt: 0, lineHeight: '1.3' }}>
        {errorMsg}
      </FormHelperText>
    )

  return <>{children}</>
}
