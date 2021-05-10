import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import responsiveVal from '../Styles/responsiveVal'
import SvgImage from '../SvgImage'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      textAlign: 'center',
      fontSize: responsiveVal(16, 24),
      marginBottom: theme.spacings.md,
    },
    img: {
      display: 'block',
      margin: `0 auto ${theme.spacings.xxs} auto`,
    },
  }),
  { name: 'IconHeader' },
)

// todo(yvo): find default material ui size type
type IconHeaderSize = 'small' | 'normal' | 'large'

type IconHeaderProps = {
  src: string
  alt: string
  title: string
  size?: IconHeaderSize
}

type IconHeaderHeadings = 'h6' | 'h5' | 'h3'

export default function IconHeader(props: IconHeaderProps) {
  const { title, size = 'normal', ...svgImageProps } = props
  const classes = useStyles()

  const variants: Record<IconHeaderSize, IconHeaderHeadings> = {
    small: 'h6',
    normal: 'h5',
    large: 'h3',
  }

  // todo(yvo): maybe we just want to use the default scale factors per size (0.5, 1, 2) for consistency..

  return (
    <div className={classes.container}>
      <SvgImage
        {...svgImageProps}
        size={size}
        scales={{
          small: 1,
          large: 1.75,
        }}
        loading='eager'
        className={classes.img}
      />

      <Typography variant={variants[size]} component='h2'>
        {title}
      </Typography>
    </div>
  )
}
