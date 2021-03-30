import { makeStyles, Theme } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    checkmark: {
      color: theme.palette.success.main,
    },
  }),
  { name: 'InputCheckmark' },
)

export default function InputCheckmark() {
  const classes = useStyles()

  return <CheckIcon className={classes.checkmark} />
}
