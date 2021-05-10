import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import PictureResponsive, { PictureResponsiveProps } from '../PictureResponsive'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: ({ shade }: any) => ({
      filter: `invert(${shade}%)`,
    }),
  }),
  { name: 'SvgImage' },
)

// todo(yvo): find default material ui size type
export type SvgImageSize = 'small' | 'normal' | 'large'

export type SvgImageShade = 'mute' | 'normal' | 'invert'

export type SvgImageProps = Omit<PictureResponsiveProps, 'srcSets' | 'width' | 'height'> & {
  src: string
  size?: SvgImageSize
  shade?: SvgImageShade
  scales?: Partial<Record<SvgImageSize, number>>
} & UseStyles<typeof useStyles>

export default function SvgImage(props: SvgImageProps) {
  const { src, scales, size = 'normal', shade = 'normal', ...pictureResponsiveProps } = props

  const invertFilter: Record<SvgImageShade, number> = {
    mute: 75,
    normal: 0,
    invert: 100,
  }

  const scale = {
    small: 0.75,
    normal: 1,
    large: 2,
    ...scales,
  }

  const defaultPixelSize = 32
  const svgImageSize = defaultPixelSize * scale[size]

  const classes = useStyles({
    ...props,
    shade: invertFilter[shade],
  })

  return (
    <>
      <PictureResponsive
        srcSets={{
          'image/svg+xml': src,
        }}
        className={clsx(classes.root)}
        height={svgImageSize}
        width={svgImageSize}
        {...pictureResponsiveProps}
      />
    </>
  )
}
