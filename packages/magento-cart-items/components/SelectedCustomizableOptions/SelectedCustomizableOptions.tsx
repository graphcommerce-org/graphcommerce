import { Money } from '@graphcommerce/magento-store'
import { filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { CartItemFragment } from '../../Api/CartItem.gql'
import { SelectedCustomizableOptionFragment } from './SelectedCustomizableOption.gql'

type SelectedCustomizableOptionProps = CartItemFragment & {
  customizable_options?: (SelectedCustomizableOptionFragment | null | undefined)[] | null
}

export function SelectedCustomizableOptions(props: SelectedCustomizableOptionProps) {
  const { customizable_options, product } = props
  const options = filterNonNullableKeys(customizable_options, [])

  if (!options.length) return null

  const productPrice = product.price_range.minimum_price.final_price.value

  return (
    <>
      {options.map((option) => (
        <Box key={option.customizable_option_uid}>
          <Box sx={{ color: 'text.primary' }}>{option.label}</Box>
          {option.values.filter(nonNullable).map((value) => (
            <Box
              key={value.customizable_option_value_uid}
              sx={(theme) => ({
                display: 'flex',
                gap: theme.spacings.xxs,
                flexDirection: 'row',
              })}
            >
              {value.label && <span>{value.label}</span>}
              {value.price.value > 0 && productPrice && (
                <Box sx={(theme) => ({ position: 'absolute', right: theme.spacings.xs })}>
                  <Money
                    value={
                      value.price.type === 'PERCENT'
                        ? productPrice * (value.price.value / 100)
                        : value.price.value
                    }
                  />
                </Box>
              )}
              {!value.label && value.value && value.value}
            </Box>
          ))}
        </Box>
      ))}
    </>
  )
}
