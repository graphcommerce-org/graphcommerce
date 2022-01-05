import { Typography } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'
import { SvgImageProps } from '../SvgImage'
import SvgImageSimple from '../SvgImage/SvgImageSimple'

// TODO: remove all occurrences. deprecated component

const useStyles = makeStyles({ name: 'IconHeader' })((theme) => ({
  container: {
    ...theme.typography.subtitle1,
    textAlign: 'center',
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
  ellipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  mediumFontWeight: {
    fontWeight: 700,
  },
}))

export type IconHeaderSize = 'small' | 'medium' | 'large'

type IconHeaderProps = {
  title: string
  size?: IconHeaderSize
  iconSize?: number
  iconSizeMobile?: number
  noMargin?: boolean
  stayInline?: boolean
  ellipsis?: boolean
} & Pick<SvgImageProps, 'src' | 'alt'> &
  UseStyles<typeof useStyles>

type IconHeaderHeadings = 'h2' | 'h4' | 'h5'

export default function IconHeader(props: IconHeaderProps) {
  const {
    title,
    size = 'large',
    stayInline = false,
    noMargin = false,
    ellipsis = false,
    iconSize,
    iconSizeMobile,
    ...svgImageProps
  } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  const variants: Record<IconHeaderSize, IconHeaderHeadings> = {
    small: 'h5',
    medium: 'h4',
    large: 'h2',
  }

  return (
    <div className={clsx(classes.container, !noMargin && classes.margin)}>
      <div className={clsx(classes.innerContainer, !stayInline && classes.breakColumnsDesktop)}>
        <SvgImageSimple {...svgImageProps} />
        <Typography
          variant={variants[size]}
          component='h2'
          className={clsx(
            ellipsis && classes.ellipsis,
            size === 'medium' && classes.mediumFontWeight,
          )}
        >
          {title}
        </Typography>
      </div>
    </div>
  )
}
