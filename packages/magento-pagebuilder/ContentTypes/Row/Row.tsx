/* eslint-disable import/no-extraneous-dependencies */
import { Image } from '@graphcommerce/image'
import type { SxProps, Theme } from '@mui/material'
import { Box, Container, useMediaQuery } from '@mui/material'
import React, { useEffect, useRef, useState, CSSProperties } from 'react'
import { MediaBackground } from '../../components/MediaBackground/MediaBackground'
import { extractImageBackgroundProps } from '../../components/MediaBackground/extractImageBackgroundProps'
import { extractVideoBackgroundProps } from '../../components/MediaBackground/extractVideoBackgroundProps'
import { extractAdvancedProps, verticalAlignmentToFlex } from '../../utils'
import defaultClasses from './row.module.css'
import type { RowContentType } from './types'

const { matchMedia } = globalThis

const classes = {}

/**
 * Page Builder Row component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Row: RowContentType['component'] = (props) => {
  const backgroundElement = useRef(null)
  const [bgImageStyle, setBgImageStyle] = useState<string | null>(null)
  //   const classes = useStyle(defaultClasses, props.classes)

  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)
  // const [mediaProps, additional2] = extractImageBackgroundProps(additional)

  const {
    appearance,
    verticalAlignment,
    minHeight,
    backgroundColor,
    enableParallax,
    parallaxSpeed = 0.5,
    // mediaQueries,
    children,
    backgroundType,

    ...remaining
  } = additional

  const dynamicStyles: SxProps<Theme> = {
    minHeight,
    ...cssProps,
  }

  if (verticalAlignment) {
    dynamicStyles.display = 'flex'
    dynamicStyles.justifyContent = verticalAlignmentToFlex(verticalAlignment)
    dynamicStyles.flexDirection = 'column'
  }

  if (appearance === 'full-bleed') {
    return (
      <Box
        className='Row full-bleed'
        sx={{
          ...dynamicStyles,
          // ...mediaQueryStyles,
          marginLeft: undefined,
          marginRight: undefined,
          display: 'grid',
          justifyContent: undefined,
          backgroundColor,
        }}
      >
        <MediaBackground {...props} sx={{ gridArea: '1 / 1' }} />

        <Container maxWidth='lg' sx={[{ backgroundColor, gridArea: '1 / 1', zIndex: 1 }]}>
          {children}
        </Container>
      </Box>
    )
  }

  // console.log(imageProps)
  if (appearance === 'full-width') {
    return (
      <Box
        className='Row full-width'
        sx={{
          ...dynamicStyles,
          // ...mediaQueryStyles,
          marginLeft: undefined,
          marginRight: undefined,
          display: 'grid',
          justifyContent: undefined,
          backgroundColor,
        }}
      >
        <Box sx={{ gridArea: '1 / 1', position: 'relative' }}>
          <MediaBackground
            {...props}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        <Container
          maxWidth='lg'
          sx={[
            {
              gridArea: '1 / 1',
              zIndex: 1,
            },
          ]}
        >
          {children}
        </Container>
      </Box>
    )
  }

  return (
    <Container className='Row contained' maxWidth='lg' sx={{ display: 'grid', backgroundColor }}>
      <MediaBackground {...props} sx={{ gridArea: '1/1', minHeight: 0 }} />
      <Box
        sx={[
          dynamicStyles,
          {
            gridArea: '1 / 1',
            zIndex: 1,
          },
        ]}
      >
        {children}
      </Box>
    </Container>
  )
}
