import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    steps: {
      ...theme.typography.body2,
      paddingLeft: theme.spacings.xs,
    },
  }),
  { name: 'SignInSteps' },
)

export default function SignInSteps() {
  const classes = useStyles()

  return (
    <ul className={classes.steps}>
      <li>E-mail address of existing customers will be recognized, sign in is optional.</li>
      <li>Fill in password fields to create an account.</li>
      <li>Leave passwords fields empty to order as guest.</li>
    </ul>
  )
}
