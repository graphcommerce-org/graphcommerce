import type { ActionCardItemBase } from '@graphcommerce/ecommerce-ui'
import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import type { AddProductsToCartFields } from '@graphcommerce/magento-product'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { filterNonNullableKeys, SectionHeader } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import React, { useMemo } from 'react'
import { BundleOptionValue } from './BundleOptionValue'
import { toBundleOptionType, type BundleOptionProps, type BundleOptionValueProps } from './types'

export const BundleOption = React.memo<BundleOptionProps>((props) => {
  const { index, item, color, layout, size, variant, product, renderer } = props
  const { options, title, required, type: incomingType, uid, price_range } = item
  const { control } = useFormAddProductsToCart()
  const type = toBundleOptionType(incomingType)

  return (
    <div>
      <SectionHeader
        labelLeft={
          <>
            {title} {required && ' *'}
          </>
        }
      />
      <ActionCardListForm<BundleOptionValueProps & ActionCardItemBase, AddProductsToCartFields>
        control={control}
        required={Boolean(required)}
        multiple={type === 'checkbox' || type === 'multi'}
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
        name={`cartItems.${index}.selected_options_record.${uid}`}
        render={renderer ?? BundleOptionValue}
        requireOptionSelection={Boolean(required)}
        items={useMemo(
          () =>
            filterNonNullableKeys(options).map((option) => ({
              product,
              item,
              option,
              value: option.uid,
              index,
              dynamicPrice: product.dynamic_price ?? false,
              discountPercent: price_range.minimum_price.discount?.percent_off ?? 0,
            })),
          [index, options, required],
        )}
      />
    </div>
  )
})
