import { Box, SxProps, Theme } from '@mui/material'
import React, { useRef } from 'react'
import {
  ImageBackground,
  ImageBackgroundComponentProps,
} from '../../components/MediaBackground/ImageBackground'
import { extractImageBackgroundProps } from '../../components/MediaBackground/extractImageBackgroundProps'
import {
  extractAdvancedProps,
  extractBorderProps,
  extractCssClassesProps,
  extractMarginProps,
  extractPaddingProps,
  extractTextAlignProps,
} from '../../utils'
import { ColumnContentType } from './types'

/**
 * Page Builder Column component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page
 * Builder.
 */
export const Column: ColumnContentType['component'] = (incoming) => {
  const [padding, remainging] = extractPaddingProps(incoming)
  const [margin, remainging2] = extractMarginProps(remainging)
  const [border, remainging3] = extractBorderProps(remainging2)
  const [textAlign, remainging4] = extractTextAlignProps(remainging3)
  const [cssClasses, remainging5] = extractCssClassesProps(remainging4)
  const [imageProps, props] = extractImageBackgroundProps(remainging5)

  const columnElement = useRef(null)
  const {
    backgroundColor,
    children,
    minHeight,
    verticalAlignment,
    width,
    appearance,
    contentType,
    sx,
  } = props

  // let image = desktopImage
  // if (mobileImage && matchMedia && matchMedia('(max-width: 768px)').matches) {
  //   image = mobileImage
  // }

  const flexDirection = 'column'

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

  const hasImage = imageProps.desktopImage || imageProps.mobileImage
  const sizes = width?.toString().replace('px', 'vw') as ImageBackgroundComponentProps['sizes']
  return (
    <Box
      data-appearance={appearance}
      data-content-type={contentType}
      className={cssClasses.join(' ')}
      sx={[
        {
          alignSelf,
          backgroundColor,
          ...margin,
          ...border,
          ...textAlign,
          flexDirection,
          justifyContent,
          minHeight,
          verticalAlignment,
          width,
        },
        hasImage ? { display: 'grid' } : { ...padding },
      ]}
      ref={columnElement}
    >
      {hasImage ? (
        <>
          <ImageBackground sizes={sizes} {...imageProps} sx={{ gridArea: '1 / 1' }} />
          <Box sx={{ gridArea: '1/1', zIndex: 1, p: 1, ...padding }}>{children}</Box>
        </>
      ) : (
        <>{children}</>
      )}
    </Box>
  )
}
