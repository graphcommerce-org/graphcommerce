import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../Styles'
import SvgImage, { SvgImageProps } from '../SvgImage'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      filter: theme.palette.type === 'light' ? undefined : 'brightness(1) invert(1)',
    },
  }),
  {
    name: 'SocialIcon',
  },
)

type SocialIconProps = UseStyles<typeof useStyles> & SvgImageProps

export function SocialIcon(props: SocialIconProps) {
  const classes = useStyles(props)

  return <SvgImage {...props} className={classes.root} />
}
