import { AddToCartItemSelector, useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { filterNonNullableKeys, ActionCardListProps } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks'
import { ConfigurableOptionValue } from '../ConfigurableOptionValue/ConfigurableOptionValue'
import { ConfigurableProductOption } from './ConfigurableProductOption'

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
  const { setError, clearErrors } = useFormAddProductsToCart()
  const { locale } = useRouter()

  const options = filterNonNullableKeys(product.configurable_options, [
    'attribute_code',
    'label',
    'values',
  ])

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
      {options.map((option, optionIndex) => (
        <ConfigurableProductOption
          {...option}
          key={option.uid}
          render={render}
          optionEndLabels={optionEndLabels}
          index={index}
          optionIndex={optionIndex}
          sx={sx}
          url_key={product.url_key}
          {...other}
        />
      ))}
    </Box>
  )
}
