import { SelectElement } from '@graphcommerce/ecommerce-ui'
import { SectionHeader, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { OptionTypeRenderer } from './CustomizableAreaOption'

type CustomizableDropDownOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableDropDownOption']
>

export function CustomizableDropDownOption(props: CustomizableDropDownOptionProps) {
  const { uid, required, index, title, dropdownValue } = props
  const { control } = useFormAddProductsToCart()

  return (
    <Box>
      <SectionHeader labelLeft={title} sx={{ mt: 0 }} />
      <SelectElement
        sx={{ width: '100%' }}
        color='primary'
        control={control}
        name={`cartItems.${index}.customizable_options.${uid}`}
        label={title}
        required={Boolean(required)}
        defaultValue=''
        options={filterNonNullableKeys(dropdownValue, ['title']).map((option) => ({
          id: option.uid,
          label: option.title,
        }))}
      />
    </Box>
  )
}
