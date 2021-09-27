import { Maybe } from '@graphcommerce/graphql'
import { RenderType } from '@graphcommerce/next-ui'
import React from 'react'
import { ProductListItemConfigurableFragment } from './ProductListItemConfigurable.gql'
import { SwatchSize, SwatchTypeRenderer } from './Swatches'
import ColorSwatchData from './Swatches/ColorSwatchData'
import ImageSwatchData from './Swatches/ImageSwatchData'
import TextSwatchData from './Swatches/TextSwatchData'

type SwatchListProps = {
  attributes: string[]
  configurable_options: Maybe<ProductListItemConfigurableFragment['configurable_options']>
}

const renderer: SwatchTypeRenderer = {
  TextSwatchData,
  ImageSwatchData,
  ColorSwatchData,
}

export default function SwatchList({ attributes, configurable_options }: SwatchListProps) {
  const options =
    configurable_options?.filter((option) => attributes.includes(option?.attribute_code ?? '')) ??
    []

  return (
    <>
      {options.map((option) => (
        <React.Fragment key={option?.attribute_code ?? ''}>
          {option?.values?.map((val) =>
            val?.swatch_data ? (
              <RenderType
                key={val?.uid ?? ''}
                renderer={renderer}
                {...val}
                {...val.swatch_data}
                size={'small' as SwatchSize}
              />
            ) : null,
          )}
        </React.Fragment>
      ))}
    </>
  )
}
