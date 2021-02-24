import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'
import clsx from 'clsx'
import React from 'react'
import responsiveVal from '../Styles/responsiveVal'

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
  { name: 'IconTitle' },
)

type IconTitleVariants = 'xs' | 'sm' | 'lg'

type IconTitleProps = {
  iconSrc: string
  alt: string
  title: string
  size?: IconTitleVariants
}

type IconTitleVariantSizePair = {
  variant: Variant
  size: 32 | 56
}

export default function IconTitle(props: IconTitleProps) {
  const { iconSrc, alt, title, size = 'lg' } = props
  const classes = useStyles()

  const sizes: Record<IconTitleVariants, IconTitleVariantSizePair> = {
    xs: {
      variant: 'h6',
      size: 32,
    },
    sm: {
      variant: 'h5',
      size: 32,
    },
    lg: {
      variant: 'h3',
      size: 56,
    },
  }

  return (
    <div className={classes.container}>
      <img
        src={iconSrc}
        alt={alt}
        className={classes.img}
        width={sizes[size].size}
        height={sizes[size].size}
        loading='eager'
      />
      <Typography variant={sizes[size].variant}>{title}</Typography>
    </div>
  )
}
