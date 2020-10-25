import React, { useState, useEffect } from 'react'
import PictureResponsive, { PictureResponsiveProps, ImageMimeTypes } from '../PictureResponsive'
import useConnectionType from '../PictureResponsive/useConnectionType'

const possibleWidths = [25, 50, 75, 100, 150, 200, 250, 300, 400, 600, 800, 1200, 1600, 2000, 2800]

export type PictureResponsiveSharpProps = Omit<PictureResponsiveProps, 'srcSets'> & {
  src: string
  type: ImageMimeTypes

  // Override compression from source type
  compression?: 'lossy' | 'lossless' | 'none'
}

type UseCompressionReturn = {
  compression: PictureResponsiveSharpProps['compression']
  quality: number
}

const useImageOptions = (
  compression: PictureResponsiveSharpProps['compression'],
  type: ImageMimeTypes,
): UseCompressionReturn => {
  const connectionType = useConnectionType()
  const [compress, setCompress] = useState<UseCompressionReturn>({
    compression: 'lossy',
    quality: 80,
  })

  useEffect(() => {
    const quality = connectionType === '4g' ? 100 : 80
    if (compression) {
      setCompress({ compression, quality })
      return
    }

    switch (type) {
      case 'image/png':
      case 'image/bmp':
      case 'image/tiff':
        setCompress({ compression: connectionType !== '4g' ? 'lossy' : 'lossless', quality })
        break
      case 'image/gif':
        setCompress({ compression: 'none', quality })
        break
      case 'image/svg+xml':
        setCompress({ compression: 'none', quality })
        break
      default:
        setCompress({ compression: 'lossy', quality })
        break
    }
  }, [type, connectionType, compression])

  return compress
}

const PictureResponsiveSharp: React.FC<PictureResponsiveSharpProps> = ({
  src,
  type,
  compression,
  ...imgProps
}) => {
  const srcSets: PictureResponsiveProps['srcSets'] = {}

  // The smallest possible image is the supplied img size, remove smaller sizes.
  const widths = possibleWidths.filter((width) => imgProps.width < width - 20)
  widths.unshift(imgProps.width)

  const imageOptions = useImageOptions(compression, type)

  switch (imageOptions.compression) {
    case 'none':
      srcSets[type] = src
      break
    case 'lossy':
      // Generate webp + jpeg for all lossy images.
      srcSets['image/webp'] = widths
        .map(
          (width) =>
            `/api/image?width=${width}&type=webp&url=${src}&quality=${imageOptions.quality} ${width}w`,
        )
        .join(', ')

      srcSets['image/jpeg'] = widths
        .map(
          (width) =>
            `/api/image?width=${width}&type=jpeg&url=${src}&quality=${imageOptions.quality} ${width}w`,
        )
        .join(', ')

      break
    case 'lossless':
      // Generate webp lossless + png for all lossless images.
      srcSets['image/webp'] = widths
        .map(
          (width) =>
            `/api/image?width=${width}&type=webp&url=${src}&quality=${imageOptions.quality}&lossless=1 ${width}w`,
        )
        .join(', ')
      srcSets['image/png'] = widths
        .map((width) => `/api/image?width=${width}&type=png&url=${src} ${width}w`)
        .join(', ')
  }

  return <PictureResponsive {...imgProps} srcSets={srcSets} />
}

export default PictureResponsiveSharp
