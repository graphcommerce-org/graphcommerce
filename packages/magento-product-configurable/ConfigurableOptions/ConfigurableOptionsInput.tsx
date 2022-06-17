import { useQuery } from '@graphcommerce/graphql'
import { useFormProductAddToCart } from '@graphcommerce/magento-product'
import {
  RenderType,
  SectionHeader,
  ToggleButton,
  ToggleButtonGroup,
  extendableComponent,
  ActionCardList,
  ActionCard,
} from '@graphcommerce/next-ui'
import {
  ActionCardItemBase,
  ActionCardItemRenderProps,
  ActionCardListForm,
} from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'

import { Controller, FieldErrors } from '@graphcommerce/react-hook-form'
import { BaseTextFieldProps, Box, FormHelperText, SxProps } from '@mui/material'
import React, { useMemo } from 'react'
import { ColorSwatchData } from '../Swatches/ColorSwatchData'
import { ImageSwatchData } from '../Swatches/ImageSwatchData'
import { TextSwatchData } from '../Swatches/TextSwatchData'
import { SwatchTypeRenderer, SwatchSize } from '../Swatches/types'
import { GetConfigurableProductConfigurationsDocument } from '../graphql/GetConfigurableProductConfigurations.gql'

export type ConfigurableOptionsInputProps = {
  size?: SwatchSize
  sx?: SxProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & Pick<BaseTextFieldProps, 'FormHelperTextProps' | 'helperText'> & {
    optionEndLabels?: Record<string, React.ReactNode>
  }

const renderer: SwatchTypeRenderer = { TextSwatchData, ImageSwatchData, ColorSwatchData }

const compName = 'ConfigurableOptionsInput' as const
const parts = ['buttonGroup', 'button', 'helperText'] as const
const { classes } = extendableComponent(compName, parts)

const bla = (cardProps) => (
  <ActionCard
    key={cardProps.value}
    {...cardProps}
    title={cardProps.store_label}
    hidden={false}
    sx={{ width: 200, margin: 3 }}
  />
)

export function ConfigurableOptionsInput(props: ConfigurableOptionsInputProps) {
  const { FormHelperTextProps, helperText, optionEndLabels, size = 'large', sx } = props

  const form = useFormProductAddToCart()
  const { register, control, watch, urlKey, formState } = form

  const watchSelectedOptions = watch('selectedOptions')
  const selectedOptions = (
    Array.isArray(watchSelectedOptions) ? watchSelectedOptions : [watchSelectedOptions ?? '']
  ).filter(Boolean)

  const cpc = useQuery(GetConfigurableProductConfigurationsDocument, {
    variables: { urlKey, selectedOptions },
  })

  const options = useMemo(() => {
    const typeProducts = cpc.data?.typeProducts ?? cpc.previousData?.typeProducts
    return typeProducts?.items?.[0]?.__typename === 'ConfigurableProduct'
      ? typeProducts?.items?.[0]?.configurable_options
      : []
  }, [cpc.data, cpc.previousData])

  console.log(watch('selectedOptions'), options)

  return (
    <>
      {options?.map((option, index) => {
        if (!option?.uid || !option.attribute_code) return null

        const fieldName = `selectedOptions.${index}` as const
        const { attribute_code, values, label } = option
        const error = formState.errors

        return (
          <>
            <SectionHeader labelLeft={label} />
            <ActionCardListForm
              key={fieldName}
              name={fieldName}
              control={control}
              required
              items={(values ?? []).map((ov) => ({
                value: ov?.uid ?? 'neejoh',
                ...ov,
              }))}
              render={bla}
              sx={{ display: 'flex' }}
            />
          </>
        )
      })}
    </>
  )
}
