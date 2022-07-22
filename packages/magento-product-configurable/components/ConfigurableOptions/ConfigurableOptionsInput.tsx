import { useFormProductAddToCart } from '@graphcommerce/magento-product'
import { SectionHeader, RenderType } from '@graphcommerce/next-ui'
import { ActionCardListForm } from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { i18n } from '@lingui/core'
import { BaseTextFieldProps, Box } from '@mui/material'
import React from 'react'
import { ColorSwatchData } from '../../Swatches/ColorSwatchData'
import { ImageSwatchData } from '../../Swatches/ImageSwatchData'
import { TextSwatchData } from '../../Swatches/TextSwatchData'

import { ConfigurableOptionsActionCardProps } from '../../Swatches/types'
import { useConfigurableTypeProduct } from '../../hooks'

export type ConfigurableOptionsInputProps = Pick<
  BaseTextFieldProps,
  'FormHelperTextProps' | 'helperText'
> & {
  optionEndLabels?: Record<string, React.ReactNode>
}

export function ConfigurableOptionsActionCard(cardProps: ConfigurableOptionsActionCardProps) {
  const { swatch_data, uid, size } = cardProps

  return (
    <RenderType
      {...cardProps}
      __typename={swatch_data?.__typename ?? 'TextSwatchData'}
      value={uid}
      variant='outlined'
      description={swatch_data?.value ?? ''}
      size={size}
      renderer={{
        ColorSwatchData,
        ImageSwatchData,
        TextSwatchData,
      }}
    />
  )
}

export function ConfigurableOptionsInput(props: ConfigurableOptionsInputProps) {
  const { optionEndLabels } = props
  const form = useFormProductAddToCart()
  const { control } = form

  const typeProduct = useConfigurableTypeProduct()

  return (
    <>
      {typeProduct?.configurable_options?.map((option, index) => {
        if (!option?.uid || !option.attribute_code) return null

        const fieldName = `selectedOptions.${index}` as const
        const { values, label } = option
        return (
          <Box key={fieldName}>
            <SectionHeader
              labelLeft={label}
              labelRight={optionEndLabels?.[option?.attribute_code ?? '']}
              sx={{ mt: 0 }}
            />
            <ActionCardListForm
              name={fieldName}
              control={control}
              size='medium'
              required
              items={(values ?? []).map((ov) => ({
                value: ov?.uid ?? '',
                ...ov,
              }))}
              render={ConfigurableOptionsActionCard}
              errorMessage={i18n._(/* i18n*/ 'Please select a value for {0}', {
                0: label?.toLocaleLowerCase(),
              })}
              sx={(theme) => ({
                '&.selected': {
                  borderColor: `${theme.palette.primary.main} !important`,
                },
              })}
            />
          </Box>
        )
      })}
    </>
  )
}
