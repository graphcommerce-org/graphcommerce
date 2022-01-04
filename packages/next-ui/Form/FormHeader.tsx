import { Theme, Typography, TypographyProps } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    heading: {
      marginBottom: `calc(${theme.spacings.xxs} * -1)`,
      marginTop: theme.spacings.xxs,
    },
  }),
  { name: 'FormHeader' },
)

export type FormHeaderProps = TypographyProps &
  UseStyles<typeof useStyles> & { children: React.ReactNode }

export default function FormHeader(props: FormHeaderProps) {
  const { children, ...typographyProps } = props
  const classes = useStyles(props)

  return (
    <Typography {...typographyProps} className={classes.heading}>
      {children}
    </Typography>
  )
}
