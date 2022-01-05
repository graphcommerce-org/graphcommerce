import { Image, ImageProps } from '@graphcommerce/image'
import React from 'react'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

// TODO: fix hot reloading issues when modifying implementations of this component
export type SvgImageSize = 'small' | 'medium' | 'large' | 'extralarge'

export type SvgImageProps = ImageProps & {
  size?: SvgImageSize | number
  mobileSize?: SvgImageSize | number
  shade?: SvgImageShade
} & UseStyles<typeof useStyles>

export type SvgImageShade = 'muted' | 'default' | 'inverted'

export const SvgImageShades: Record<SvgImageShade, number> = {
  muted: 75,
  default: 0,
  inverted: 100,
}

export type UseStylesProps = { shade: number; baseSize: number; mobileSize: number }

const useStyles = makeStyles<UseStylesProps>({ name: 'SvgImage' })(
  (theme, { shade, baseSize, mobileSize }) => ({
    root: {
      filter: shade > 0 ? `invert(${shade}%)` : undefined,
      objectFit: 'contain',
      width: mobileSize ?? Math.round(baseSize * 0.75),
      height: mobileSize ?? Math.round(baseSize * 0.75),
      [theme.breakpoints.up('md')]: {
        width: baseSize,
        height: baseSize,
      },
    },
  }),
)

export default function SvgImage(props: SvgImageProps) {
  const { src, size = 'medium', mobileSize, shade = 'default', ...imageProps } = props

  // if (isStaticImageData(src)) {
  //   console.log(src.height)
  //   console.log(src.width)
  // }

  const baseSizes = {
    small: 24,
    medium: 32,
    large: 48,
    extralarge: 64,
  }

  const styleProps = {
    mobileSize: baseSizes[mobileSize ?? ''] ?? mobileSize,
    baseSize: baseSizes[size ?? ''] ?? size,
    shade: SvgImageShades[shade],
  }
  const classes = useMergedClasses(useStyles(styleProps).classes, props.classes)

  return (
    <Image
      layout='fixed'
      unoptimized
      src={src}
      className={classes.root}
      // height={24}
      // width={24}
      {...imageProps}
    />
  )
}
