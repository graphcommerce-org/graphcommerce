import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'
import { TextSwatchDataFragment } from './TextSwatchData.gql'
import { SwatchDataProps } from '.'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
  }),
  { name: 'TextSwatchData' },
)

type TextSwatchDataProps = TextSwatchDataFragment & SwatchDataProps & UseStyles<typeof useStyles>

export default function TextSwatchData(props: TextSwatchDataProps) {
  const classes = useStyles(props)
  const { value, store_label } = props
  return <div className={classes.root}>{store_label}</div>
}
