import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import PictureResponsive, { PictureResponsiveProps } from '../PictureResponsive'
import { HTMLElementShade, HTMLElementShades, UseStyles } from '../Styles'

export type SvgImageSize = 'small' | 'medium' | 'large' | 'extralarge'

export type SvgImageProps = Omit<PictureResponsiveProps, 'srcSets' | 'width' | 'height'> & {
  src: React.ReactNode
  size?: SvgImageSize
  pixelSize?: number
  shade?: HTMLElementShade
} & UseStyles<typeof useStyles>

type UseStylesProps = { shade: number; pixelSize?: number; baseSize: number }

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: ({ shade, pixelSize, baseSize }: UseStylesProps) => ({
      filter: shade > 0 ? `invert(${shade}%)` : undefined,
      width: pixelSize ?? baseSize,
      height: pixelSize ?? baseSize,
    }),
  }),
  { name: 'SvgImage' },
)

export default function SvgImage(props: SvgImageProps) {
  const {
    src,
    pixelSize = null,
    size = 'medium',
    shade = 'default',
    ...pictureResponsiveProps
  } = props

  const baseSizes = {
    small: 24,
    medium: 32,
    large: 48,
    extralarge: 64,
  }

  const classes = useStyles({
    ...props,
    baseSize: baseSizes[size],
    shade: HTMLElementShades[shade],
  })

  return (
    <>
      <PictureResponsive
        srcSets={{
          'image/svg+xml': src as string,
        }}
        className={clsx(classes.root)}
        height={pixelSize ?? baseSizes[size]}
        width={pixelSize ?? baseSizes[size]}
        {...pictureResponsiveProps}
      />
    </>
  )
}
