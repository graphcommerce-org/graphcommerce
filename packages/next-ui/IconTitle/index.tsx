import { makeStyles, Theme, Typography } from '@material-ui/core'
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

type IconTitleProps = {
  iconSrc: string
  alt: string
  title: string
  big?: boolean
}

export default function IconTitle(props: IconTitleProps) {
  const { iconSrc, alt, title, big } = props
  const classes = useStyles()

  const size = big ? 56 : 32

  return (
    <div className={classes.container}>
      <img
        src={iconSrc}
        alt={alt}
        className={classes.img}
        width={size}
        height={size}
        loading='eager'
      />
      <Typography variant={big ? 'h2' : 'h5'}>{title}</Typography>
    </div>
  )
}
