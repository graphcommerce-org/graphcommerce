import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import PictureResponsive, { PictureResponsiveProps } from '../PictureResponsive'
import { UseStyles } from '../Styles'

// TODO: fix hot reloading issues when modifying implementations of this component
export type SvgImageSize = 'small' | 'medium' | 'large' | 'extralarge'

export type SvgImageProps = Omit<PictureResponsiveProps, 'srcSets' | 'width' | 'height'> & {
  src: React.ReactNode
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

type UseStylesProps = { shade: number; baseSize: number; mobileSize: number }

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: ({ shade, baseSize, mobileSize }: UseStylesProps) => ({
      filter: shade > 0 ? `invert(${shade}%)` : undefined,
      width: mobileSize ?? Math.round(baseSize * 0.75),
      height: mobileSize ?? Math.round(baseSize * 0.75),
      [theme.breakpoints.up('md')]: {
        width: baseSize,
        height: baseSize,
      },
    }),
  }),
  { name: 'SvgImage' },
)

export default function SvgImage(props: SvgImageProps) {
  const { src, size = 'medium', mobileSize, shade = 'default', ...pictureResponsiveProps } = props

  const baseSizes = {
    small: 24,
    medium: 32,
    large: 48,
    extralarge: 64,
  }

  const classes = useStyles({
    ...props,
    mobileSize: baseSizes[mobileSize ?? ''] ?? mobileSize,
    baseSize: baseSizes[size ?? ''] ?? size,
    shade: SvgImageShades[shade],
  })

  return (
    <>
      <PictureResponsive
        srcSets={{
          'image/svg+xml': src as string,
        }}
        className={clsx(classes.root)}
        height={24}
        width={24}
        {...pictureResponsiveProps}
      />
    </>
  )
}
