import React from 'react'
import PictureResponsive, { PictureResonsiveProps, ImageMimeTypes } from '../PictureResponsive'

const possibleWidths = [25, 50, 75, 100, 200, 300, 400, 600, 800, 1200, 1600, 2000, 2800]

export type FilestackPictureProps = Omit<PictureResonsiveProps, 'srcSets'> & {
  src: string
  type: ImageMimeTypes

  // Override compression from source type
  compression?: 'lossy' | 'lossless' | 'none'
}

const detectResize = (type: ImageMimeTypes): NonNullable<FilestackPictureProps['compression']> => {
  switch (type) {
    case 'image/png':
    case 'image/bmp':
    case 'image/tiff':
      return 'lossless'
    case 'image/svg+xml':
    case 'image/gif':
      return 'none'
    default:
      return 'lossy'
  }
}

const FilestackPicture: React.FC<FilestackPictureProps> = ({
  src,
  type,
  compression: resize,
  ...imgProps
}) => {
  const url = new URL(src)
  const handle = url.pathname.substr(1)

  if (handle.includes('/')) {
    throw new Error(`Please provide a bare Filestack compatible URL: ${src}`)
  }

  const srcSets: PictureResonsiveProps['srcSets'] = {}

  // The smallest possible image is the supplied img size, remove smaller sizes.
  const widths = possibleWidths.filter((width) => imgProps.width < width - 20)
  widths.unshift(imgProps.width)

  switch (resize || detectResize(type)) {
    case 'none':
      srcSets[type] = src
      break
    case 'lossy':
      // Generate webp + jpeg for all lossy images.
      srcSets['image/webp'] = widths
        .map((width) => {
          url.pathname = `resize=fit:max,w:${width}/cache=expiry:max/output=c:true,f:webp,quality:100,t:true/${handle}`
          return `${url.toString()} ${width}w`
        })
        .join(', ')

      srcSets[type] = widths
        .map((width) => {
          url.pathname = `resize=fit:max,w:${width}/cache=expiry:max/output=c:true,f:jpg,quality:100,t:true/${handle}`
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
