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
      margin: `0 auto ${responsiveVal(2, 8)} auto`,
    },
  }),
  { name: 'IconHeader' },
)

type IconHeaderSize = 'small' | 'medium' | 'large'

type IconHeaderProps = {
  src: string
  alt: string
  title: string
  size?: IconHeaderSize
}

type IconHeaderHeadings = 'h6' | 'h5' | 'h3'

export default function IconHeader(props: IconHeaderProps) {
  const { title, size = 'medium', ...svgImageProps } = props
  const classes = useStyles()

  const variants: Record<IconHeaderSize, IconHeaderHeadings> = {
    small: 'h6',
    medium: 'h5',
    large: 'h3',
  }

  const iconSizes = {
    small: 32,
    medium: 48,
    large: 64,
  }

  return (
    <div className={classes.container}>
      <SvgImage {...svgImageProps} size={iconSizes[size]} loading='eager' className={classes.img} />

      <Typography variant={variants[size]} component='h2'>
        {title}
      </Typography>
    </div>
  )
}
