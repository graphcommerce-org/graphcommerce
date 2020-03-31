import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import { withMuiTheme } from '@harelpls/storybook-addon-materialui'
import { makeStyles, Theme } from '@material-ui/core'
import Container, { Styles } from '.'
import { theme as importTheme } from '../../layout/FullLayout'

export default {
  title: 'row|Container',
  component: Container,
  decorators: [withKnobs, withMuiTheme({ Default: importTheme })],
}

const useStyles = makeStyles<Theme, Styles>((theme: Theme) => ({
  left: { backgroundColor: theme.palette.secondary.main },
  right: { backgroundColor: theme.palette.primary.main },
  container: {},
  spread: { backgroundColor: theme.palette.grey[300] },
}))

export const Default = () => {
  const classes = useStyles()
  return (
    <Container left='left' right='right' classes={classes}>
      Hallo
    </Container>
  )
}

export const StretchRight = () => {
  const classes = useStyles()
  return (
    <Container left='left' right='right' classes={classes} stretch='right'>
      Hallo
    </Container>
  )
}

export const StretchLeft = () => {
  const classes = useStyles()
  return (
    <Container left='left' right='right' classes={classes} stretch='left'>
      Hallo
    </Container>
  )
}

export const StretchBoth = () => {
  const classes = useStyles()
  return (
    <Container left='left' right='right' classes={classes} stretch='both'>
      Hallo
    </Container>
  )
}

export const SizeMd = () => {
  const classes = useStyles()
  return (
    <Container left='left' right='right' classes={classes} size='md'>
      Hallo
    </Container>
  )
}
