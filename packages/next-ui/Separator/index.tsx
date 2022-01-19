import { Typography, TypographyProps } from '@mui/material'
import React from 'react'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

export type DividedLinksProps = {
  icon?: React.ReactNode
} & Pick<TypographyProps, 'color'> &
  UseStyles<typeof useStyles>

const useStyles = makeStyles({ name: 'Separator' })((theme) => ({
  root: {
    display: 'inline',
    padding: `0 ${theme.spacings.xxs} 0 ${theme.spacings.xxs}`,
  },
}))

export function Separator(props: DividedLinksProps) {
  const { color, icon } = props
  let { classes } = useStyles()
  classes = useMergedClasses(classes, props.classes)

  return (
    <div className={classes.root}>
      {icon ?? (
        <Typography component='span' variant='body1' color={color}>
          |
        </Typography>
      )}
    </div>
  )
}
