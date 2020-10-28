import React, { useState, useEffect } from 'react'
import PictureResponsive, { PictureResponsiveProps, ImageMimeTypes } from '../PictureResponsive'
import useConnectionType from '../PictureResponsive/useConnectionType'

// eslint-disable-next-line no-underscore-dangle
const { deviceSizes, imageSizes, loader, path, domains } = process.env.__NEXT_IMAGE_OPTS

const possibleWidths = [...imageSizes, ...deviceSizes]

export type PictureResponsiveNextProps = Omit<PictureResponsiveProps, 'srcSets'> & {
  src: string
  type: ImageMimeTypes

  // Override compression from source type
  compression?: 'lossy' | 'lossless' | 'none'
}

type UseCompressionReturn = {
  compression: PictureResponsiveNextProps['compression']
  quality: number
}

const useImageOptions = (
  compression: PictureResponsiveNextProps['compression'],
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

function PictureResponsiveNext({
  src,
  type,
  compression,
  ...imgProps
}: PictureResponsiveNextProps) {
  const srcSets: PictureResponsiveProps['srcSets'] = {}

  // The smallest possible image is the supplied img size, remove smaller sizes.
  const widths = possibleWidths.filter((width) => imgProps.width < width - 50)

  const imageOptions = useImageOptions(compression, type)

  switch (imageOptions.compression) {
    case 'none':
      srcSets[type] = src
      break
    case 'lossy':
      // Generate webp + jpeg for all lossy images.
      srcSets['image/webp'] = widths
        .map(
          (width) => `${path}?w=${width}&type=webp&url=${src}&q=${imageOptions.quality} ${width}w`,
        )
        .join(', ')

      srcSets['image/jpeg'] = widths
        .map(
          (width) => `${path}?w=${width}&type=jpeg&url=${src}&q=${imageOptions.quality} ${width}w`,
        )
        .join(', ')

      break
    case 'lossless':
      // Generate webp lossless + png for all lossless images.
      srcSets['image/webp'] = widths
        .map(
          (width) =>
            `${path}?w=${width}&type=webp&url=${src}&q=${imageOptions.quality}&lossless=1 ${width}w`,
        )
        .join(', ')
      srcSets['image/png'] = widths
        .map((width) => `/_next/image?w=${width}&type=png&url=${src} ${width}w`)
        .join(', ')
  }

  return <PictureResponsive {...imgProps} srcSets={srcSets} />
}

export default PictureResponsiveNext
