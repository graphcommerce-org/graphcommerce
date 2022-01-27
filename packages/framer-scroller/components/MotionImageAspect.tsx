import { Image, ImageProps } from '@graphcommerce/image'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { forwardRef } from 'react'

export type MotionImageAspectProps = Omit<ImageProps, 'layout' | 'unoptimized'>

const { classes } = extendableComponent('ScrollerDots', ['root', 'image', 'picture'] as const)

/**
 * - Renders an image with the given aspect ratio
 * - Supports framer motion layout transitions
 *
 * Note: We have a fallback for Safari 14 which doesn't yet support aspect-ratio, this causes a
 * problem when the layout is animated. Should be fixed in Safari 15
 */
const MotionImageAspect = m(
  forwardRef<HTMLImageElement, MotionImageAspectProps>((props, ref) => (
    <Box
      className={classes.root}
      sx={{
        position: 'relative',

        '& > picture': {
          display: 'block',
          '@supports (aspect-ratio: 1 / 1)': {
            maxWidth: '99.6%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',

            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            '&:after': {
              display: 'block',
              content: '""',
              minWidth: '100vw',
            },
          },
          '@supports not (aspect-ratio: 1 / 1)': {
            width: '100% !important',
            height: '100% !important',
          },
        },
        '& > img': {
          display: 'block',
          '@supports not (aspect-ratio: 1 / 1)': {
            objectFit: 'contain',
          },
        },
      }}
    >
      <Image
        {...props}
        layout='fill'
        ref={ref}
        className={clsx(classes.image, props.className)}
        pictureProps={{
          className: clsx(classes.picture, props.pictureProps?.className),
          style: { ...props.style, aspectRatio: `${props.width} / ${props.height}` },
        }}
      />
    </Box>
  )),
)

MotionImageAspect.displayName = 'MotionImageAspect'

export default MotionImageAspect
