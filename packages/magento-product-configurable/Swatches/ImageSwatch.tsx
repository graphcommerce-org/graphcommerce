import React from 'react'
import Swatch, { SwatchProps } from './Swatch'

export default function ImageSwatch(props: SwatchProps) {
  return (
    <Swatch
      {...props}
      avatar={(value) => (
        <img
          src={value?.swatch_data?.thumbnail ?? ''}
          key={value?.value_index ?? ''}
          alt={value?.swatch_data?.value ?? ''}
        />
      )}
    />
  )
}
