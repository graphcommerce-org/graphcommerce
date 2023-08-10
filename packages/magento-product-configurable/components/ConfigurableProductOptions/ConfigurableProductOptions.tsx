import {
  AddProductsToCartMutationVariables,
  AddToCartItemSelector,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product'
import { SectionHeader, filterNonNullableKeys, ActionCardListProps } from '@graphcommerce/next-ui'
import {
  ActionCardItemBase,
  ActionCardListForm,
} from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { i18n } from '@lingui/core'
import { Box, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks'
import { ConfigurableOptionValue } from '../ConfigurableOptionValue/ConfigurableOptionValue'
import { ConfigurableOptionValueFragment } from '../ConfigurableOptionValue/ConfigurableOptionValue.gql'

export type ConfigurableProductOptionsProps = AddToCartItemSelector & {
  optionEndLabels?: Record<string, React.ReactNode>
  sx?: SxProps<Theme>
  render?: typeof ConfigurableOptionValue
  product: ConfigurableOptionsFragment
} & Pick<ActionCardListProps, 'color' | 'variant' | 'size' | 'layout' | 'collapse'>

export function ConfigurableProductOptions(props: ConfigurableProductOptionsProps) {
  const {
    optionEndLabels,
    sx,
    render = ConfigurableOptionValue,
    product,
    index = 0,
    ...other
  } = props
  const { control, setError, clearErrors } = useFormAddProductsToCart()
  const { locale } = useRouter()

  const options = useMemo(
    () =>
      filterNonNullableKeys(product.configurable_options, ['attribute_code', 'label']).map(
        (option) => ({
          ...option,
          values: filterNonNullableKeys(option.values, ['uid']).map((ov) => ({
            value: ov.uid,
            ...ov,
          })),
        }),
      ),
    [product.configurable_options],
  )

  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })
  const unavailable =
    configured &&
    (configured?.configurable_product_options_selection?.options_available_for_selection ?? [])
      .length === 0

  const allLabels = useMemo(() => {
    // Remove optional dialect from locale, which Intl.NumberFormat does not support.
    const strippedLocale = locale?.split('-', 2).join('-')

    const formatter = new Intl.ListFormat(strippedLocale, { style: 'long', type: 'conjunction' })
    return formatter.format(options.map((o) => o.label))
  }, [locale, options])

  useEffect(() => {
    if (unavailable) {
      setError(`cartItems.${index}.sku`, {
        message: i18n._(/* i18n */ 'Product not available in {allLabels}', { allLabels }),
      })
    }
    if (!unavailable) clearErrors(`cartItems.${index}.sku`)
  }, [allLabels, clearErrors, index, setError, unavailable])

  return (
    <Box sx={(theme) => ({ display: 'grid', rowGap: theme.spacings.sm })}>
      {options.map((option, idx) => {
        const { values, label } = option
        const fieldName = `cartItems.${index}.selected_options.${idx}` as const

        return (
          <Box key={fieldName} sx={sx}>
            <SectionHeader
              labelLeft={label}
              labelRight={optionEndLabels?.[option?.attribute_code ?? '']}
              sx={{ mt: 0 }}
            />

            <ActionCardListForm<
              ActionCardItemBase & ConfigurableOptionValueFragment,
              AddProductsToCartMutationVariables
            >
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
    </Box>
  )
}
