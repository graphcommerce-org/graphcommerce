import React from 'react'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'
import SvgImage, { SvgImageProps } from '../SvgImage'

const useStyles = makeStyles({ name: 'SocialIcon' })((theme) => ({
  root: {
    filter: theme.palette.mode === 'light' ? undefined : 'brightness(1) invert(1)',
  },
}))

type SocialIconProps = UseStyles<typeof useStyles> & SvgImageProps

export function SocialIcon(props: SocialIconProps) {
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return <SvgImage {...props} className={classes.root} />
}
