import React, { useState, useEffect } from 'react'
import PictureResponsive, {
  PictureResponsiveProps,
  ImageMimeTypes,
} from 'components/PictureResponsive'
import useConnectionType from 'components/PictureResponsive/useConnectionType'

const possibleWidths = [25, 50, 75, 100, 150, 200, 250, 300, 400, 600, 800, 1200, 1600, 2000, 2800]

export type FilestackPictureProps = Omit<PictureResponsiveProps, 'srcSets'> & {
  src: string
  type: ImageMimeTypes

  // Override compression from source type
  compression?: 'lossy' | 'lossless' | 'none'
}

type UseCompressionReturn = {
  compression: FilestackPictureProps['compression']
  quality: number
}

const useImageOptions = (
  compression: FilestackPictureProps['compression'],
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

const FilestackPicture: React.FC<FilestackPictureProps> = ({
  src,
  type,
  compression,
  ...imgProps
}) => {
  const url = new URL(src)
  const handle = url.pathname.substr(1)

  if (handle.includes('/')) {
    throw new Error(`Please provide a bare Filestack compatible URL: ${src}`)
  }

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
        .map((width) => {
          url.pathname = `resize=fit:max,w:${width}/cache=expiry:max/output=c:true,f:webp,quality:${imageOptions.quality},t:true/${handle}`
          return `${url.toString()} ${width}w`
        })
        .join(', ')

      srcSets['image/jpeg'] = widths
        .map((width) => {
          url.pathname = `resize=fit:max,w:${width}/cache=expiry:max/output=c:true,f:jpg,quality:${imageOptions.quality},t:true/${handle}`
          return `${url.toString()} ${width}w`
        })
        .join(', ')

      break
    case 'lossless':
      srcSets['image/png'] = widths
        .map((width) => {
          url.pathname = `resize=fit:max,w:${width}/cache=expiry:max/output=c:true,f:png,t:true/${handle}`
          return `${url.toString()} ${width}w`
        })
        .join(', ')
  }

  return <PictureResponsive {...imgProps} srcSets={srcSets} />
}

export default FilestackPicture
