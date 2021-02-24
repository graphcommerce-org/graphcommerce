import React, { useState, useEffect } from 'react'
import PictureResponsive, { PictureResponsiveProps, ImageMimeTypes } from '../PictureResponsive'
import useConnectionType from '../PictureResponsive/useConnectionType'

// eslint-disable-next-line no-underscore-dangle
const { deviceSizes, imageSizes, loader, path, domains } = process.env.__NEXT_IMAGE_OPTS

const possibleWidths = [...imageSizes, ...deviceSizes]

export type PictureResponsiveNextProps = Omit<PictureResponsiveProps, 'srcSets'> & {
  src: string
  type: ImageMimeTypes
}

function PictureResponsiveNext({ src, type, ...imgProps }: PictureResponsiveNextProps) {
  const srcSets: PictureResponsiveProps['srcSets'] = {}

  // Make sure the initial hydration doesn't use the actual value
  const connType = useConnectionType()
  const [connectionType, setConnectionType] = useState<typeof connType>()
  useEffect(() => setConnectionType(connType), [connType])

  // The smallest possible image is the supplied img size, remove smaller sizes.
  const widths = possibleWidths.filter((width) => imgProps.width < width - 50)
  const quality = connectionType === '4g' ? 100 : 80

  const url = (width: number, imgType: string, add = '') =>
    `${path}?w=${width}&type=${imgType}&url=${src}&q=${quality}${add} ${width}w`

  if (connectionType === '4g') {
    switch (type) {
      case 'image/svg+xml':
      case 'image/x-icon':
        srcSets[type] = src
        break
      case 'image/apng':
      case 'image/gif':
        // animate images
        srcSets['image/webp'] = widths.map((width) => url(width, 'webp')).join(', ')
        srcSets[type] = widths.map((width) => url(width, type.split('image/')[1])).join(', ')
        break
      case 'image/jpeg':
        srcSets['image/webp'] = widths.map((width) => url(width, 'webp')).join(', ')
        srcSets['image/jpeg'] = widths.map((width) => url(width, 'jpg')).join(', ')
        break
      default:
        srcSets['image/webp'] = widths.map((width) => url(width, 'webp', '&lossless=1')).join(', ')
        srcSets['image/png'] = widths.map((width) => url(width, 'png')).join(', ')
        break
    }
  } else {
    switch (type) {
      case 'image/svg+xml':
      case 'image/x-icon':
        srcSets[type] = src
        break
      case 'image/apng':
      case 'image/gif':
        type.split('image/')[1]
        // animate images
        srcSets['image/webp'] = widths.map((width) => url(width, 'webp')).join(', ')
        srcSets[type] = widths.map((width) => url(width, type.split('image/')[1])).join(', ')
        break
      default:
        srcSets['image/webp'] = widths.map((width) => url(width, 'webp')).join(', ')
        srcSets['image/jpeg'] = widths.map((width) => url(width, 'jpg')).join(', ')
        break
    }
  }

  return <PictureResponsive {...imgProps} srcSets={srcSets} />
}

export default PictureResponsiveNext
