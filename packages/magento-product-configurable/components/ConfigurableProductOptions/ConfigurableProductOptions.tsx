import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { SectionHeader, filterNonNullableKeys, ActionCardListProps } from '@graphcommerce/next-ui'
import {
  ActionCardItemBase,
  ActionCardListForm,
} from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { i18n } from '@lingui/core'
import { Box, SxProps, Theme } from '@mui/material'
import React, { useMemo } from 'react'

import { useConfigurableTypeProduct } from '../../hooks'
import { ConfigurableOptionValue } from '../ConfigurableOptionValue/ConfigurableOptionValue'
import { ConfigurableOptionValueFragment } from '../ConfigurableOptionValue/ConfigurableOptionValue.gql'

export type ConfigurableProductOptionsProps = {
  optionEndLabels?: Record<string, React.ReactNode>
  sx?: SxProps<Theme>
  render?: typeof ConfigurableOptionValue
} & Pick<ActionCardListProps, 'color' | 'variant' | 'size' | 'layout'>

export function ConfigurableProductOptions(props: ConfigurableProductOptionsProps) {
  const {
    optionEndLabels,
    sx,
    color = 'primary',
    size = 'medium',
    layout = 'grid',
    variant = 'outlined',
    render = ConfigurableOptionValue,
  } = props
  const form = useFormAddProductsToCart()
  const { control } = form

  const typeProduct = useConfigurableTypeProduct()

  const options = useMemo(
    () =>
      filterNonNullableKeys(typeProduct?.configurable_options, ['attribute_code']).map(
        (option) => ({
          ...option,
          values: filterNonNullableKeys(option.values, ['uid', 'swatch_data']).map((ov) => ({
            value: ov.uid,
            ...ov,
          })),
        }),
      ),
    [typeProduct?.configurable_options],
  )

  return (
    <>
      {options.map((option, index) => {
        const { values, label } = option
        const fieldName = `cartItems.0.selected_options.${index}` as const

        return (
          <Box key={fieldName} sx={sx}>
            <SectionHeader
              labelLeft={label}
              labelRight={optionEndLabels?.[option?.attribute_code ?? '']}
              sx={{ mt: 0 }}
            />
            <ActionCardListForm<ActionCardItemBase & ConfigurableOptionValueFragment>
              color={color}
              layout={layout}
              variant={variant}
              size={size}
              name={fieldName}
              control={control}
              required
              items={values}
              render={render}
              errorMessage={i18n._(/* i18n*/ 'Please select a value for {label}', { label })}
            />
          </Box>
        )
      })}
    </>
  )
}
