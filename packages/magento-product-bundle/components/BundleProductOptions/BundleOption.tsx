import { useFormAddProductsToCart } from '@graphcommerce/magento-product/components'
import {
  SectionHeader,
  ActionCardListForm,
  ActionCardItemBase,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import React, { useMemo } from 'react'
import { BundleOptionValue } from './BundleOptionValue'
import { BundleOptionProps, BundleOptionValueProps } from './types'

export const BundleOption = React.memo<BundleOptionProps>((props) => {
  const { idx, options, title, color, layout, size, variant, required: _required } = props
  const { control } = useFormAddProductsToCart()

  const can_change_quantity = options?.some((o) => o?.can_change_quantity)
  const required = _required ?? false
  const errorMessage = required
    ? i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label: title })
    : undefined

  return (
    <div>
      <SectionHeader labelLeft={title} sx={{ mt: 0 }} />
      <ActionCardListForm<BundleOptionValueProps & ActionCardItemBase>
        control={control}
        required={required}
        color={color}
        layout={layout}
        size={size}
        variant={variant}
        defaultValue={options?.find((opt) => opt?.is_default)?.uid}
        errorMessage={errorMessage}
        name={
          options?.some((o) => o?.can_change_quantity)
            ? `cartItems.0.entered_options.${idx}.uid`
            : `cartItems.0.selected_options.${idx}`
        }
        collapse={can_change_quantity}
        render={BundleOptionValue}
        items={useMemo(
          () =>
            filterNonNullableKeys(options).map((option) => ({
              ...option,
              value: option.uid,
              idx,
              required,
            })),
          [idx, options, required],
        )}
      />
    </div>
  )
})
