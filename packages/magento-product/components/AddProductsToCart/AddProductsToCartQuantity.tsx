import { NumberFieldElement, NumberFieldElementProps } from '@graphcommerce/ecommerce-ui'
import { useFormAddProductsToCart } from './AddProductsToCartForm'

type AddToCartQuantityProps = Omit<
  NumberFieldElementProps,
  'error' | 'required' | 'inputProps' | 'inputRef' | 'helperText' | 'name'
> & { index?: number }

export function AddProductsToCartQuantity(props: AddToCartQuantityProps) {
  const { formState, control, index = 0 } = useFormAddProductsToCart()

  return (
    <NumberFieldElement
      variant='outlined'
      size='small'
      {...props}
      required
      inputProps={{ min: 1 }}
      defaultValue='1'
      control={control}
      name={`cartItems.${index}.quantity`}
      helperText={formState.isSubmitted && formState.errors.cartItems?.[index].quantity?.message}
    />
  )
}
