import { useFormProductAddToCart } from '@graphcommerce/magento-product'
import { SectionHeader, RenderType } from '@graphcommerce/next-ui'
import { ActionCardListForm } from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { Trans } from '@lingui/react'
import { BaseTextFieldProps } from '@mui/material'
import React from 'react'
import { ColorSwatchData } from '../Swatches/ColorSwatchData'
import { ImageSwatchData } from '../Swatches/ImageSwatchData'
import { TextSwatchData } from '../Swatches/TextSwatchData'

import { ConfigurableOptionsActionCardProps } from '../Swatches/types'
import { useConfigurableTypeProduct } from '../hooks'

export type ConfigurableOptionsInputProps = Pick<
  BaseTextFieldProps,
  'FormHelperTextProps' | 'helperText'
> & {
  optionEndLabels?: Record<string, React.ReactNode>
}

function ConfigurableOptionsActionCard(cardProps: ConfigurableOptionsActionCardProps) {
  const { swatch_data } = cardProps

  // switch (swatch_data?.__typename) {
  //   case 'ColorSwatchData':
  //     return <ColorSwatchData {...cardProps} />
  //   case 'ImageSwatchData':
  //     return <ImageSwatchData {...cardProps} />
  //   case 'TextSwatchData':
  //     return <TextSwatchData {...cardProps} />
  //   default:
  //     return null
  // }

  return (
    <RenderType
      {...cardProps}
      __typename={swatch_data?.__typename ?? 'TextSwatchData'}
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
          <React.Fragment key={fieldName}>
            <SectionHeader
              labelLeft={label}
              labelRight={optionEndLabels?.[option?.attribute_code ?? '']}
            />
            <ActionCardListForm
              key={fieldName}
              name={fieldName}
              control={control}
              size='small'
              required
              items={(values ?? []).map((ov) => ({
                value: ov?.uid ?? '',
                size: 'small',
                ...ov,
              }))}
              error={false}
              render={ConfigurableOptionsActionCard}
              errorMessage={
                <Trans
                  id='Please select a value for {0}'
                  values={{ 0: label?.toLocaleLowerCase() }}
                />
              }
            />
          </React.Fragment>
        )
      })}
    </>
  )
}
