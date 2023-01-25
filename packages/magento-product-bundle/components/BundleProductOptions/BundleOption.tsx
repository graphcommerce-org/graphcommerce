import {
  AddProductsToCartMutationVariables,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product/components'
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
  const { idx, index, options, title, color, layout, size, variant, required: _required } = props
  const { control } = useFormAddProductsToCart()

  const can_change_quantity = options?.some((o) => o?.can_change_quantity)
  const required = _required ?? false

  return (
    <div>
      <SectionHeader labelLeft={title} sx={{ mt: 0 }} />
      <ActionCardListForm<
        BundleOptionValueProps & ActionCardItemBase,
        AddProductsToCartMutationVariables
      >
        control={control}
        required={required}
        color={color}
        layout={layout}
        size={size}
        variant={variant}
        defaultValue={options?.find((opt) => opt?.is_default)?.uid}
        rules={{
          required: required
            ? i18n._(/* i18n*/ 'Please select a value for ‘{label}’', { label: title })
            : false,
        }}
        name={
          options?.some((o) => o?.can_change_quantity)
            ? `cartItems.${index}.entered_options.${idx}.uid`
            : `cartItems.${index}.selected_options.${idx}`
        }
        // collapse={can_change_quantity}
        render={BundleOptionValue}
        items={useMemo(
          () =>
            filterNonNullableKeys(options).map((option) => ({
              ...option,
              value: option.uid,
              idx,
              index,
              required,
            })),
          [idx, index, options, required],
        )}
      />
    </div>
  )
})
