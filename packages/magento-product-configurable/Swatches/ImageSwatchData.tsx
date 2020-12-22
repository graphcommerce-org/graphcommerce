import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import React from 'react'
import { SwatchTypeRenderer } from '.'

const ImageSwatchData: SwatchTypeRenderer['ImageSwatchData'] = ({ value, thumbnail }) => (
  <div>
    {thumbnail ? (
      <PictureResponsiveNext
        src={thumbnail}
        type='image/jpeg'
        width={40}
        height={40}
        alt={value ?? ''}
      />
    ) : (
      value
    )}
  </div>
)

export default ImageSwatchData
