import { Money } from '@graphcommerce/magento-store'
import type { PriceModifier } from '@graphcommerce/magento-store/components/PriceModifiers'
import { filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import type { CartItemFragment } from '../../Api/CartItem.gql'
import type { SelectedCustomizableOptionFragment } from './SelectedCustomizableOption.gql'

export type SelectedCustomizableOptionProps = CartItemFragment & {
  customizable_options?: (SelectedCustomizableOptionFragment | null | undefined)[] | null
}

export function selectedCustomizableOptionsModifiers(
  props: SelectedCustomizableOptionProps,
): PriceModifier[] {
  const { customizable_options, product } = props

  return filterNonNullableKeys(customizable_options).map((option) => ({
    key: option.customizable_option_uid,
    label: option.label,
    items: filterNonNullableKeys(option.values).map((value) => ({
      key: value.customizable_option_value_uid,
      label: value.label || value.value,
      amount:
        value.price.type === 'PERCENT'
          ? (product.price_range.minimum_price.final_price.value ?? 0) * (value.price.value / 100)
          : value.price.value,
    })),
  }))
}

/** @deprecated Replaced by `selectedCustomizableOptionsModifiers` */
export function SelectedCustomizableOptions(props: SelectedCustomizableOptionProps) {
  const { customizable_options, product, prices } = props
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
                    currency={prices?.price.currency}
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
