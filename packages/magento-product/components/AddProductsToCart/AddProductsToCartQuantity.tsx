import { NumberFieldElement, NumberFieldElementProps } from '@graphcommerce/ecommerce-ui'
import {
  AddProductsToCartFields,
  AddToCartItemSelector,
  useFormAddProductsToCart,
} from './useFormAddProductsToCart'

type AddToCartQuantityProps = Omit<
  NumberFieldElementProps<AddProductsToCartFields>,
  'error' | 'required' | 'inputProps' | 'helperText' | 'name' | 'control'
> &
  AddToCartItemSelector

export function AddProductsToCartQuantity(props: AddToCartQuantityProps) {
  const { index = 0 } = props
  const { control } = useFormAddProductsToCart()

  return (
    <NumberFieldElement
      variant='outlined'
      size='small'
      color='primary'
      {...props}
      required
      inputProps={{ min: 1 }}
      defaultValue={1}
      control={control}
      name={`cartItems.${index}.quantity`}
    />
  )
}
