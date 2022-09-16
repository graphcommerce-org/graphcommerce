import { TextInputNumber, TextInputNumberProps } from '@graphcommerce/next-ui'
import { useFormAddProductsToCart } from './AddProductsToCartForm'

type AddToCartQuantityProps = Omit<
  TextInputNumberProps,
  'error' | 'required' | 'inputProps' | 'inputRef' | 'helperText' | 'disabled'
>

export function AddProductsToCartQuantity(props: AddToCartQuantityProps) {
  const { formState, muiRegister } = useFormAddProductsToCart()

  return (
    <TextInputNumber
      variant='outlined'
      size='small'
      {...props}
      error={formState.isSubmitted && !!formState.errors.cartItems?.[0].quantity}
      required
      inputProps={{ min: 1 }}
      {...muiRegister('cartItems.0.quantity', { required: true })}
      helperText={formState.isSubmitted && formState.errors.cartItems?.[0].quantity?.message}
      disabled={formState.isSubmitting}
    />
  )
}
