import type { ActionCardRequireOptionSelection } from '@graphcommerce/ecommerce-ui'
import type { AddToCartItemSelector } from '@graphcommerce/magento-product'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import type { ActionCardListProps } from '@graphcommerce/next-ui'
import { filterNonNullableKeys, useLocale } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import type { ConfigurableOptionsFragment } from '../../graphql'
import { useConfigurableOptionsSelection } from '../../hooks'
import { ConfigurableOptionValue } from '../ConfigurableOptionValue/ConfigurableOptionValue'
import { ConfigurableProductOption } from './ConfigurableProductOption'

export type ConfigurableProductOptionsProps = AddToCartItemSelector & {
  optionStartLabels?: Record<string, React.ReactNode>
  optionEndLabels?: Record<string, React.ReactNode>
  sx?: SxProps<Theme>
  render?: typeof ConfigurableOptionValue
  product: ConfigurableOptionsFragment
} & Pick<ActionCardListProps, 'color' | 'variant' | 'size' | 'layout' | 'collapse'> &
  ActionCardRequireOptionSelection

export function ConfigurableProductOptions(props: ConfigurableProductOptionsProps) {
  const {
    optionStartLabels,
    optionEndLabels,
    sx,
    render = ConfigurableOptionValue,
    product,
    index = 0,
    ...other
  } = props
  const { setError, clearErrors } = useFormAddProductsToCart()

  const options = filterNonNullableKeys(product.configurable_options, [
    'attribute_code',
    'label',
    'values',
  ])

  const { configured } = useConfigurableOptionsSelection({ ...product, index })
  const unavailable =
    configured &&
    (configured?.configurable_product_options_selection?.options_available_for_selection ?? [])
      .length === 0

  const locale = useLocale()
  const allLabels = useMemo(() => {
    const formatter = new Intl.ListFormat(locale, {
      style: 'long',
      type: 'conjunction',
    })
    return formatter.format(options.map((o) => o.label))
  }, [locale, options])

  useEffect(() => {
    if (unavailable) {
      setError(`cartItems.${index}.sku`, {
        message: t`Product not available in ${allLabels}`,
      })
    }
    if (!unavailable) clearErrors(`cartItems.${index}.sku`)
  }, [allLabels, clearErrors, index, setError, unavailable])

  return (
    <Box sx={(theme) => ({ display: 'grid', rowGap: theme.spacings.sm })}>
      {options
        .sort((a, b) => (a?.position ?? 0) - (b?.position ?? 0))
        .map((option, optionIndex) => (
          <ConfigurableProductOption
            {...option}
            key={option.uid}
            render={render}
            optionStartLabels={optionStartLabels}
            optionEndLabels={optionEndLabels}
            index={index}
            optionIndex={optionIndex}
            sx={sx}
            __typename={product.__typename}
            url_key={product.url_key}
            {...other}
          />
        ))}
    </Box>
  )
}
