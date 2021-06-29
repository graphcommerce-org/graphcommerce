import { makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import responsiveVal from '../Styles/responsiveVal'
import SvgImage from '../SvgImage'

// TODO: fix hot reloading issues when modifying implementations of this component

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
    },
    breakColumnsDesktop: {
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
  iconSize?: number
  iconSizeMobile?: number
  noMargin?: boolean
  stayInline?: boolean
}

type IconHeaderHeadings = 'h5' | 'h4' | 'h3'

export default function IconHeader(props: IconHeaderProps) {
  const {
    title,
    size = 'large',
    stayInline = false,
    noMargin = false,
    iconSize,
    iconSizeMobile,
    ...svgImageProps
  } = props
  const classes = useStyles()

  const variants: Record<IconHeaderSize, IconHeaderHeadings> = {
    small: 'h5',
    medium: 'h4',
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
      <div className={clsx(classes.innerContainer, !stayInline && classes.breakColumnsDesktop)}>
        <SvgImage
          {...svgImageProps}
          size={iconSize ?? iconSizes[size]}
          mobileSize={iconSizeMobile ?? iconMobileSizes[size]}
          loading='eager'
        />
        <Typography variant={variants[size]} component='h2'>
          {title}
        </Typography>
      </div>
    </div>
  )
}
