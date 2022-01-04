import { useTheme } from '@mui/material/styles'
import { createMakeStyles, createWithStyles } from 'tss-react'

const { makeStyles, useStyles } = createMakeStyles({ useTheme })
const { withStyles } = createWithStyles({ useTheme })

const myMakeStyles: typeof makeStyles = (params) => {
  const result = makeStyles(params)
  const nested: typeof result = (asdf) => {
    const res = result(asdf)
    return res
  }
  return nested
}

export { makeStyles, useStyles, withStyles }
