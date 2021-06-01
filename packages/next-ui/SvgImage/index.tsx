import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import PictureResponsive, { PictureResponsiveProps } from '../PictureResponsive'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'

export type SvgImageSize = 'small' | 'medium' | 'large' | 'extralarge'

export type SvgImageProps = Omit<PictureResponsiveProps, 'srcSets' | 'width' | 'height'> & {
  src: React.ReactNode
  size?: SvgImageSize | number
  shade?: SvgImageShade
} & UseStyles<typeof useStyles>

export type SvgImageShade = 'muted' | 'default' | 'inverted'

export const SvgImageShades: Record<SvgImageShade, number> = {
  muted: 75,
  default: 0,
  inverted: 100,
}

type UseStylesProps = { shade: number; baseSize: number }

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: ({ shade, baseSize }: UseStylesProps) => ({
      filter: shade > 0 ? `invert(${shade}%)` : undefined,
      width: `${responsiveVal(0.75 * baseSize, baseSize)}`,
      height: `${responsiveVal(0.75 * baseSize, baseSize)}`,
    }),
  }),
  { name: 'SvgImage' },
)

export default function SvgImage(props: SvgImageProps) {
  const { src, size = 'medium', shade = 'default', ...pictureResponsiveProps } = props

  const baseSizes = {
    small: 24,
    medium: 32,
    large: 48,
    extralarge: 64,
  }

  const classes = useStyles({
    ...props,
    baseSize: baseSizes[size] ?? size,
    shade: SvgImageShades[shade],
  })

  return (
    <>
      <PictureResponsive
        srcSets={{
          'image/svg+xml': src as string,
        }}
        className={clsx(classes.root)}
        height={baseSizes[size] ?? size}
        width={baseSizes[size] ?? size}
        {...pictureResponsiveProps}
      />
    </>
  )
}
