import type { ImageProps } from '@graphcommerce/image'
import { Image } from '@graphcommerce/image'
import { Box, type BoxProps } from '@mui/material'
import { m, type MotionProps } from 'framer-motion'
import { forwardRef } from 'react'

export type MotionImageAspectPropsAdditional = MotionProps

export type MotionImageAspectProps<
  P extends MotionImageAspectPropsAdditional = MotionImageAspectPropsAdditional,
> = Omit<ImageProps, 'layout' | 'unoptimized'> &
  MotionProps & {
    slotProps?: {
      box?: BoxProps
      additional?: P
    }
    Additional?: (props: P) => React.ReactNode
  }

/**
 * - Renders an image with the given aspect ratio
 * - Supports framer motion layout transitions
 *
 * Note: We have a fallback for Safari 14 which doesn't yet support aspect-ratio, this causes a
 * problem when the layout is animated. Should be fixed in Safari 15
 */
export const MotionImageAspect = m.create(
  forwardRef<HTMLImageElement, MotionImageAspectProps>((props, ref) => {
    const { Additional, slotProps, ...rest } = props

    return (
      <Box
        className='MotionImageAspect'
        sx={[
          {
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
          },
          ...(Array.isArray(slotProps?.box?.sx) ? slotProps.box.sx : [slotProps?.box?.sx]),
        ]}
        {...slotProps?.box}
      >
        <Image
          {...rest}
          layout='fill'
          ref={ref}
          className={props.className}
          pictureProps={{
            ...props.pictureProps,
            className: props.pictureProps?.className,
            style: { ...props.style, aspectRatio: `${props.width} / ${props.height}` },
          }}
        />
        {Additional && <Additional {...slotProps?.additional} {...rest} />}
        {slotProps?.box?.children}
      </Box>
    )
  }),
)

MotionImageAspect.displayName = 'MotionImageAspect'
