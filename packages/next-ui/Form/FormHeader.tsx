import { Typography, TypographyProps } from '@mui/material'
import React from 'react'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'FormHeader' })((theme) => ({
  heading: {
    marginBottom: `calc(${theme.spacings.xxs} * -1)`,
    marginTop: theme.spacings.xxs,
  },
}))

export type FormHeaderProps = TypographyProps &
  UseStyles<typeof useStyles> & { children: React.ReactNode }

export function FormHeader(props: FormHeaderProps) {
  const { children, ...typographyProps } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <Typography {...typographyProps} className={classes.heading}>
      {children}
    </Typography>
  )
}
