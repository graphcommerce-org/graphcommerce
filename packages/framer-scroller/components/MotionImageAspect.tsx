import { makeStyles } from '@material-ui/core'
import { Image, ImageProps } from '@reachdigital/image'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { forwardRef } from 'react'

const useStyles = makeStyles(
  {
    picture: {
      display: 'block',
      '@supports (aspect-ratio: 1 / 1)': {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto !important',
        height: 'auto !important',
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
    image: {
      display: 'block',
      '@supports not (aspect-ratio: 1 / 1)': {
        objectFit: 'contain',
      },
    },
  },
  { name: 'MotionImageAspect' },
)

export type MotionImageAspectProps = Omit<ImageProps, 'layout' | 'unoptimized'>

/**
 * - Renders an image with the given aspect ratio
 * - Supports framer motion layout transitions
 *
 * Note: We have a fallback for Safari which doesn't yet support aspect-ratio, this causes a problem
 * when the layout is animated. Should be fixed in Safari 15
 */
const MotionImageAspect = m(
  forwardRef<HTMLImageElement, MotionImageAspectProps>((props, ref) => {
    const classes = useStyles()
    return (
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
    )
  }),
)

export default MotionImageAspect
