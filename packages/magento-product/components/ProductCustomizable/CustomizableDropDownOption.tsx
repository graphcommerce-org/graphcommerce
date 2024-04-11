import { SelectElement } from '@graphcommerce/ecommerce-ui'
import { SectionHeader, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { OptionTypeRenderer } from './CustomizableAreaOption'
import { Money } from '@graphcommerce/magento-store'

type CustomizableDropDownOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableDropDownOption']
>

export function CustomizableDropDownOption(props: CustomizableDropDownOptionProps) {
  const { uid, required, index, title, dropdownValue, productPrice, currency } = props
  const { control, getValues } = useFormAddProductsToCart()

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
        options={filterNonNullableKeys(dropdownValue, ['title']).map((option) => {
          const price =
            option.price === 0
              ? null
              : option.price && (
                  <Box
                    sx={{
                      display: 'flex',
                      typography: 'body1',
                      '&.sizeMedium': { typographty: 'subtitle1' },
                      '&.sizeLarge': { typography: 'h6' },
                      color:
                        option.uid === getValues(`cartItems.${index}.customizable_options.${uid}`)
                          ? 'text.primary'
                          : 'text.secondary',
                    }}
                  >
                    {/* Change fontFamily so the + is properly outlined */}
                    <span style={{ fontFamily: 'arial', paddingTop: '1px' }}>+{'\u00A0'}</span>
                    <Money
                      value={
                        option.price_type === 'PERCENT'
                          ? productPrice * (option.price / 100)
                          : option.price
                      }
                      currency={currency}
                    />
                  </Box>
                )
          return {
            id: option.uid,
            label: option.title,
            price,
          }
        })}
      />
    </Box>
  )
}
