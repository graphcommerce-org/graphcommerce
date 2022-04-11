/* eslint-disable import/no-extraneous-dependencies */
import { Image } from '@graphcommerce/image'
import { Box, Container, SxProps, Theme, useMediaQuery } from '@mui/material'
import React, { useEffect, useRef, useState, CSSProperties } from 'react'
import {
  extractAdvancedProps,
  extractBackgroundImagesProps,
  verticalAlignmentToFlex,
} from '../../utils'
import defaultClasses from './row.module.css'
import { RowContentType, VideoProps } from './types'

const { matchMedia } = globalThis

const classes = {}

export function extractVideoProps<P extends VideoProps>(
  props: P,
): [VideoProps, Omit<P, keyof VideoProps>] {
  const {
    videoSrc,
    videoFallbackSrc,
    videoLazyLoading,
    videoLoop,
    videoOverlayColor,
    videoPlayOnlyVisible,
    ...remaining
  } = props
  return [
    {
      videoSrc,
      videoFallbackSrc,
      videoLazyLoading,
      videoLoop,
      videoOverlayColor,
      videoPlayOnlyVisible,
    },
    remaining,
  ]
}

/**
 * Page Builder Row component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Row: RowContentType['component'] = (props) => {
  const backgroundElement = useRef(null)
  const [bgImageStyle, setBgImageStyle] = useState<string | null>(null)
  //   const classes = useStyle(defaultClasses, props.classes)

  const [cssProps, cssClasses, isHidden, additional] = extractAdvancedProps(props)
  const [imageProps, additional2] = extractBackgroundImagesProps(additional)
  const [videoProps, additional3] = extractVideoProps(additional2)

  const {
    appearance,
    verticalAlignment,
    minHeight,
    backgroundColor,
    enableParallax,
    parallaxSpeed = 0.5,
    mediaQueries,
    children,
    backgroundType,
    ...remaining
  } = additional3

  const dynamicStyles: SxProps<Theme> = {
    minHeight,
    ...cssProps,
  }

  // if (image) {
  //   dynamicStyles.backgroundImage = bgImageStyle
  //   dynamicStyles.backgroundSize = backgroundSize
  //   dynamicStyles.backgroundPosition = backgroundPosition
  //   dynamicStyles.backgroundAttachment = backgroundAttachment
  //   dynamicStyles.backgroundRepeat = backgroundRepeat
  // }

  if (verticalAlignment) {
    dynamicStyles.display = 'flex'
    dynamicStyles.justifyContent = verticalAlignmentToFlex(verticalAlignment)
    dynamicStyles.flexDirection = 'column'
  }

  //   //
  //   useDetectScrollWidth()
  //   // Determine the containers width and optimize the image
  //   useEffect(() => {
  //     // Intelligently resize cover background images
  //     if (image && backgroundElement.current) {
  //       if (backgroundSize === 'cover') {
  //         let elementWidth = backgroundElement.current.offsetWidth
  //         let elementHeight = backgroundElement.current.offsetHeight
  //         // If parallax is enabled resize at a higher resolution, as the image will be zoomed
  //         if (enableParallax) {
  //           elementWidth = Math.round(elementWidth * 1.25)
  //           elementHeight = Math.round(elementHeight * 1.25)
  //         }
  //         setBgImageStyle(
  //           `url(${resourceUrl(image, {
  //             type: 'image-wysiwyg',
  //             width: elementWidth,
  //             height: elementHeight,
  //             quality: 85,
  //             crop: false,
  //             fit: 'cover',
  //           })})`,
  //         )
  //       } else {
  //         setBgImageStyle(
  //           `url(${resourceUrl(image, {
  //             type: 'image-wysiwyg',
  //             quality: 85,
  //           })})`,
  //         )
  //       }
  //     }
  //   }, [backgroundSize, enableParallax, image, setBgImageStyle])

  //   // Initiate jarallax for Parallax and background video
  //   useEffect(() => {
  //     let parallaxElement
  //     let jarallax
  //     let jarallaxVideo

  //     if (enableParallax && bgImageStyle && backgroundType !== 'video') {
  //       ;({ jarallax } = require('jarallax'))
  //       parallaxElement = backgroundElement.current
  //       jarallax(parallaxElement, {
  //         speed: parallaxSpeed,
  //         imgSize: backgroundSize,
  //         imgPosition: backgroundPosition,
  //         imgRepeat: backgroundRepeat,
  //       })
  //     }

  //     if (backgroundType === 'video') {
  //       ;({ jarallax } = require('jarallax'))
  //       ;({ jarallaxVideo } = require('jarallax'))
  //       jarallaxVideo()
  //       parallaxElement = backgroundElement.current
  //       jarallax(parallaxElement, {
  //         speed: enableParallax ? parallaxSpeed : 1,
  //         imgSrc: videoFallbackSrc
  //           ? resourceUrl(videoFallbackSrc, {
  //               type: 'image-wysiwyg',
  //               quality: 85,
  //             })
  //           : null,
  //         videoSrc,
  //         videoLoop,
  //         videoPlayOnlyVisible,
  //         videoLazyLoading,
  //         zIndex: 'auto',
  //       })

  //       parallaxElement.jarallax.video &&
  //         parallaxElement.jarallax.video.on('started', () => {
  //           const self = parallaxElement.jarallax

  //           // show video
  //           if (self.$video) {
  //             self.$video.style.visibility = 'visible'
  //           }
  //         })
  //     }

  //     return () => {
  //       if (
  //         (enableParallax && parallaxElement && bgImageStyle) ||
  //         (parallaxElement && backgroundType === 'video')
  //       ) {
  //         jarallax(parallaxElement, 'destroy')
  //       }
  //     }
  //   }, [
  //     backgroundPosition,
  //     backgroundRepeat,
  //     backgroundSize,
  //     bgImageStyle,
  //     enableParallax,
  //     parallaxSpeed,
  //     backgroundType,
  //     videoSrc,
  //     videoFallbackSrc,
  //     videoLoop,
  //     videoPlayOnlyVisible,
  //     videoLazyLoading,
  //   ])

  const videoOverlay = videoProps.videoOverlayColor ? (
    <Box
      sx={{
        gridArea: '1 / 1',
        backgroundColor: videoProps.videoOverlayColor,
      }}
    />
  ) : null

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
        {imageProps.desktopImage && (
          <Image
            src={imageProps.desktopImage}
            layout='fill'
            sizes='100vw'
            sx={{}}
            pictureProps={{ sx: { gridArea: '1 / 1' } }}
          />
        )}

        {videoOverlay}

        <Container
          maxWidth='lg'
          sx={[{ backgroundColor, gridArea: '1 / 1' }, !!imageProps.desktopImage && { zIndex: 1 }]}
        >
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
        {imageProps.desktopImage && (
          <Box sx={{ gridArea: '1 / 1', position: 'relative' }}>
            <Image
              src={imageProps.desktopImage}
              layout='fill'
              sizes='100vw'
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
        )}

        {videoOverlay}
        <Container
          maxWidth='lg'
          sx={[
            {
              gridArea: '1 / 1',
            },
            !!imageProps.desktopImage && { zIndex: 1 },
          ]}
        >
          {children}
        </Container>
      </Box>
    )
  }

  return (
    <Container className='Row contained' maxWidth='lg' sx={{ display: 'grid', backgroundColor }}>
      {imageProps.desktopImage && (
        <Image
          src={imageProps.desktopImage}
          layout='fill'
          sizes='100vw'
          sx={{ objectFit: imageProps.backgroundSize as string }}
          pictureProps={{ sx: { gridArea: '1/1', minHeight: 0 } }}
        />
      )}
      {videoOverlay}
      <Box
        sx={[
          dynamicStyles,
          {
            gridArea: '1 / 1',
          },
          !!imageProps.desktopImage && { zIndex: 1 },
        ]}
      >
        {children}
      </Box>
    </Container>
  )
}
