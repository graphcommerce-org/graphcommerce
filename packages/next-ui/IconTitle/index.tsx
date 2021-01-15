import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import responsiveVal from '../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      textAlign: 'center',
      ...theme.typography.h3,
      fontSize: responsiveVal(16, 24),
      marginBottom: theme.spacings.md,
    },
    img: {
      display: 'block',
      margin: `0 auto ${theme.spacings.xxs} auto`,
      width: responsiveVal(24, 40),
      height: responsiveVal(24, 40),
    },
  }),
  { name: 'IconTitle' },
)

type IconTitleProps = {
  iconSrc: string
  alt: string
  title: string
}

export default function IconTitle(props: IconTitleProps) {
  const { iconSrc, alt, title } = props
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <img src={iconSrc} alt={alt} className={classes.img} width={64} height={64} loading='eager' />
      <span>{title}</span>
    </div>
  )
}
