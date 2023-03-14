import Box from '@mui/material/Box'
import { SxProps, Theme } from '@mui/material/styles'
import React, { useRef } from 'react'
import { extractImageBackgroundProps } from '../../components/MediaBackground/extractImageBackgroundProps'
import { extractAdvancedProps } from '../../utils'
import { ColumnContentType } from './types'

/**
 * Page Builder Column component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page
 * Builder.
 */
export const Column: ColumnContentType['component'] = (incoming) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(incoming)
  const [imageProps, props] = extractImageBackgroundProps(additional)

  const columnElement = useRef(null)
  const { backgroundColor, children, minHeight, verticalAlignment, width, appearance } = props

  // let image = desktopImage
  // if (mobileImage && matchMedia && matchMedia('(max-width: 768px)').matches) {
  //   image = mobileImage
  // }

  const flexDirection = 'column'
  const display = 'flex'

  let alignSelf: React.CSSProperties['alignSelf']

  switch (appearance) {
    case 'align-top':
      alignSelf = 'flex-start'
      break
    case 'align-center':
      alignSelf = 'center'
      break
    case 'align-bottom':
      alignSelf = 'flex-end'
      break
    case 'full-height':
    default:
      alignSelf = 'stretch'
      break
  }

  let justifyContent: React.CSSProperties['justifyContent']

  switch (verticalAlignment) {
    case 'middle':
      justifyContent = 'center'
      break
    case 'bottom':
      justifyContent = 'flex-end'
      break
    case 'top':
    default:
      justifyContent = 'flex-start'
      break
  }

  const dynamicStyles: SxProps<Theme> = {
    alignSelf,
    backgroundColor,
    ...cssProps,
    display,
    flexDirection,
    justifyContent,
    minHeight,
    verticalAlignment,
    width,
  }

  // if (image) {
  //   dynamicStyles.backgroundImage = bgImageStyle
  //   dynamicStyles.backgroundSize = backgroundSize
  //   dynamicStyles.backgroundPosition = backgroundPosition
  //   dynamicStyles.backgroundAttachment = backgroundAttachment
  //   dynamicStyles.backgroundRepeat = backgroundRepeat
  // }

  // // Determine the containers width and optimize the image
  // useEffect(() => {
  //   if (image && columnElement.current) {
  //     if (backgroundSize === 'cover') {
  //       setBgImageStyle(
  //         `url(${resourceUrl(image, {
  //           type: 'image-wysiwyg',
  //           width: columnElement.current.offsetWidth,
  //           height: columnElement.current.offsetHeight,
  //           quality: 85,
  //           crop: false,
  //           fit: 'cover',
  //         })})`,
  //       )
  //     } else {
  //       setBgImageStyle(
  //         `url(${resourceUrl(image, {
  //           type: 'image-wysiwyg',
  //           quality: 85,
  //         })})`,
  //       )
  //     }
  //   }
  // }, [backgroundSize, image, setBgImageStyle])

  return (
    <Box sx={dynamicStyles} ref={columnElement}>
      {children}
    </Box>
  )
}
