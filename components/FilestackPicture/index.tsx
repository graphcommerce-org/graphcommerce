import React from 'react'
import { PictureResonsiveProps, PictureResponsive, ImageTypes } from '../PictureResponsive'

const possibleWidths = [25, 50, 75, 100, 200, 300, 400, 600, 800, 1200, 1600, 2000, 2800]

export type FilestackPictureProps = Omit<PictureResonsiveProps, 'srcSets'> & {
  src: string
  type: ImageTypes

  // Override compression from source type
  resize?: 'lossy' | 'lossless' | 'none'
}

const detectResize = (type: ImageTypes): NonNullable<FilestackPictureProps['resize']> => {
  switch (type) {
    case 'image/apng':
    case 'image/png':
    case 'image/gif':
      return 'lossless'
    case 'image/svg+xml':
      return 'none'
    default:
      return 'lossy'
  }
}

export const FilestackPicture: React.FC<FilestackPictureProps> = ({
  src,
  type,
  resize,
  ...imgProps
}) => {
  const url = new URL(src)
  const handle = url.pathname.substr(1)

  if (handle.includes('/')) {
    throw new Error('Please provide a bare Filestack compatible URL')
  }

  const srcSets: PictureResonsiveProps['srcSets'] = {}

  // The smallest possible image is the supplied img size, remove smaller sizes.
  const widths = possibleWidths.filter(width => imgProps.width < width - 20)
  widths.unshift(imgProps.width)

  switch (resize || detectResize(type)) {
    case 'none':
      srcSets[type] = src
      break
    case 'lossy':
      // Generate webp + jpeg for all lossy images.
      srcSets['image/webp'] = widths
        .map(width => {
          url.pathname = `resize=fit:max,w:${width}/cache=expiry:max/output=c:true,f:webp,quality:100,t:true/${handle}`
          return `${url.toString()} ${width}w`
        })
        .join(', ')
      srcSets['image/jpeg'] = widths
        .map(width => {
          url.pathname = `resize=fit:max,w:${width}/cache=expiry:max/output=c:true,f:jpg,quality:100,t:true/${handle}`
          return `${url.toString()} ${width}w`
        })
        .join(', ')
      break
    case 'lossless':
      srcSets['image/png'] = widths
        .map(width => {
          url.pathname = `resize=fit:max,w:${width}/cache=expiry:max/output=c:true,f:png,t:true/${handle}`
          return `${url.toString()} ${width}w`
        })
        .join(', ')
  }

  return <PictureResponsive {...imgProps} srcSets={srcSets} />
}
