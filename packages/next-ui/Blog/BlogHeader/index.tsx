import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { responsiveVal } from '../..'
import Row from '../../Row'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      maxWidth: 800,
      margin: `0 auto`,
      marginBottom: theme.spacings.md,
    },
    asset: {
      '& img': {
        borderRadius: responsiveVal(8, 12),
      },
    },
  }),
  { name: 'BlogHeader' },
)

export type BlogHeaderProps = UseStyles<typeof useStyles> & {
  asset?: React.ReactNode
}

export default function BlogHeader(props: BlogHeaderProps) {
  const { asset } = props
  const classes = useStyles()

  return (
    <div className={classes.header}>{asset && <div className={classes.asset}>{asset}</div>}</div>
  )
}
