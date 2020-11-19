import React from 'react'
import Swatch, { SwatchProps } from './Swatch'

export default function ColorSwatch(props: SwatchProps) {
  return (
    <Swatch
      {...props}
      avatar={(value) => (
        <div
          style={{
            backgroundColor: value?.swatch_data?.value ?? undefined,
            borderRadius: '50%',
          }}
        />
      )}
    />
  )
}
