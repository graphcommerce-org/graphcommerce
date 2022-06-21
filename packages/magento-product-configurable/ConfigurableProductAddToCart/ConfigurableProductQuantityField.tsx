import { useFormProductAddToCart } from '@graphcommerce/magento-product'
import { TextInputNumber } from '@graphcommerce/next-ui'

type ConfigurableOptionsInputProps = {
  className?: string
}

export function ConfigurableProductQuantityField(props: ConfigurableOptionsInputProps) {
  const { className } = props
  const { muiRegister, formState, required } = useFormProductAddToCart()

  return (
    <TextInputNumber
      variant='outlined'
      error={formState.isSubmitted && !!formState.errors.quantity}
      required={required.quantity}
      inputProps={{ min: 1 }}
      {...muiRegister('quantity', { required: required.quantity })}
      helperText={formState.isSubmitted && formState.errors.quantity?.message}
      defaultValue={1}
      // disabled={loading}
      size='small'
      className={className}
      sx={(theme) => ({ marginTop: theme.spacings.sm })}
    />
  )
}
