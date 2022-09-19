import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { SectionHeader, filterNonNullableKeys, ActionCardListProps } from '@graphcommerce/next-ui'
import {
  ActionCardItemBase,
  ActionCardListForm,
} from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { i18n } from '@lingui/core'
import { Alert, Box, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks'
import { ConfigurableOptionValue } from '../ConfigurableOptionValue/ConfigurableOptionValue'
import { ConfigurableOptionValueFragment } from '../ConfigurableOptionValue/ConfigurableOptionValue.gql'

export type ConfigurableProductOptionsProps = {
  optionEndLabels?: Record<string, React.ReactNode>
  sx?: SxProps<Theme>
  render?: typeof ConfigurableOptionValue
  product: ConfigurableOptionsFragment
} & Pick<ActionCardListProps, 'color' | 'variant' | 'size' | 'layout' | 'collapse'>

export function ConfigurableProductOptions(props: ConfigurableProductOptionsProps) {
  const { optionEndLabels, sx, render = ConfigurableOptionValue, product, ...other } = props
  const { control, setError, clearErrors } = useFormAddProductsToCart()
  const { locale } = useRouter()

  const options = useMemo(
    () =>
      filterNonNullableKeys(product.configurable_options, ['attribute_code', 'label']).map(
        (option) => ({
          ...option,
          values: filterNonNullableKeys(option.values, ['uid', 'swatch_data']).map((ov) => ({
            value: ov.uid,
            ...ov,
          })),
        }),
      ),
    [product.configurable_options],
  )

  const { configured } = useConfigurableOptionsSelection()

  useEffect(() => {
    const unavailable =
      configured &&
      (configured?.configurable_product_options_selection?.options_available_for_selection ?? [])
        .length === 0

    if (unavailable) {
      const formatter = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' })
      const allLabels = formatter.format(options.map((o) => o.label))

      setError('cartItems.0.sku', {
        message: i18n._(/* i18n */ 'Product not available in {allLabels}', { allLabels }),
      })
    }
    if (!unavailable) clearErrors('cartItems.0.sku')
  }, [clearErrors, configured, locale, options, setError])

  return (
    <div>
      {options.map((option, index) => {
        const { values, label } = option
        const fieldName = `cartItems.0.selected_options.${index}` as const

        return (
          <Box key={fieldName} sx={sx}>
            <SectionHeader
              labelLeft={label}
              labelRight={optionEndLabels?.[option?.attribute_code ?? '']}
              sx={(theme) => ({ mt: 0, '&:not(:first-of-type)': { mt: theme.spacings.sm } })}
            />

            <ActionCardListForm<ActionCardItemBase & ConfigurableOptionValueFragment>
              layout='grid'
              {...other}
              name={fieldName}
              control={control}
              required
              items={values}
              render={render}
              rules={{
                required: i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label }),
              }}
            />
          </Box>
        )
      })}
    </div>
  )
}
