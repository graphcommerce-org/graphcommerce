import { makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import responsiveVal from '../Styles/responsiveVal'
import SvgImage from '../SvgImage'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      textAlign: 'center',
      fontSize: responsiveVal(16, 24),
    },
    innerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      [theme.breakpoints.up('md')]: {
        display: 'unset',
      },
    },
    margin: {
      marginTop: theme.spacings.sm,
      marginBottom: theme.spacings.sm,
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
  iconSize?: IconHeaderSize | number
  noMargin?: boolean
}

type IconHeaderHeadings = 'h6' | 'h5' | 'h3'

export default function IconHeader(props: IconHeaderProps) {
  const { title, iconSize = 'large', noMargin = false, ...svgImageProps } = props
  const classes = useStyles()

  const size = 'large'

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

  const iconMobileSizes = {
    small: 16,
    medium: 32,
    large: 40,
  }

  return (
    <div className={clsx(classes.container, !noMargin && classes.margin)}>
      <div className={classes.innerContainer}>
        <SvgImage
          {...svgImageProps}
          size={iconSize ?? iconSizes[iconSize]}
          mobileSize={iconSize ?? iconMobileSizes[iconSize]}
          loading='eager'
        />
        <Typography variant={variants[size]} component='h2'>
          {title}
        </Typography>
      </div>
    </div>
  )
}
