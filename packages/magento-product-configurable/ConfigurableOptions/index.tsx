import RenderType from '@reachdigital/next-ui/RenderType'
import ToggleButton from '@reachdigital/next-ui/ToggleButton'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import React from 'react'
import { useConfigurableContext } from '../ConfigurableContext'
import cheapestVariant from '../ConfigurableContext/cheapestVariant'
import { SwatchTypeRenderer } from '../Swatches'
import ColorSwatchData from '../Swatches/ColorSwatchData'
import ImageSwatchData from '../Swatches/ImageSwatchData'
import TextSwatchData from '../Swatches/TextSwatchData'

type ConfigurableOptionsProps = { sku: string }

const renderer: SwatchTypeRenderer = { TextSwatchData, ImageSwatchData, ColorSwatchData }

export default function ConfigurableOptions({ sku }: ConfigurableOptionsProps) {
  const { options, selection, select, getVariants, cheapest } = useConfigurableContext(sku)

  return (
    <>
      {options?.map((option) => (
        <React.Fragment key={option?.id ?? ''}>
          {option?.label}
          <ToggleButtonGroup required>
            {option?.values?.map((value) => {
              if (!value?.swatch_data || !value.value_index || !option.attribute_code) return null
              const variants = getVariants({
                ...selection,
                [option.attribute_code]: value.value_index,
              })
              console.log(variants)
              return (
                <ToggleButton key={value.value_index} value={value.value_index ?? ''}>
                  <RenderType renderer={renderer} {...value} {...value.swatch_data} size='large' />
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>
        </React.Fragment>
      ))}
    </>
  )
}
