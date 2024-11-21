import type { Maybe } from '@graphcommerce/graphql-mesh'
import { RenderType } from '@graphcommerce/next-ui'
import React from 'react'
import { ColorSwatchData } from './Swatches/ColorSwatchData'
import { ImageSwatchData } from './Swatches/ImageSwatchData'
import { TextSwatchData } from './Swatches/TextSwatchData'
import type { SwatchSize, SwatchTypeRenderer } from './Swatches/types'
import type { ProductListItemConfigurableFragment } from './components/ProductListItemConfigurable/ProductListItemConfigurable.gql'

type SwatchListProps = {
  attributes?: string[]
  configurable_options?: Maybe<ProductListItemConfigurableFragment['configurable_options']>
}

const renderer: SwatchTypeRenderer = {
  TextSwatchData,
  ImageSwatchData,
  ColorSwatchData,
}

export function SwatchList(props: SwatchListProps) {
  const { attributes = [], configurable_options } = props
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
                __typename={val?.swatch_data?.__typename ?? 'TextSwatchData'}
                size={'small' as SwatchSize}
              />
            ) : null,
          )}
        </React.Fragment>
      ))}
    </>
  )
}
