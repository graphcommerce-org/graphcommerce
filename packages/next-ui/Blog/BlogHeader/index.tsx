import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Row from '../../Row'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      maxWidth: 800,
      maxHeight: '30vh',
      margin: `0 auto`,
      marginBottom: theme.spacings.md,
      backgroundColor: 'rgba(0,0,0,0.08)',
      overflow: 'hidden',
    },
    asset: {
      '& img': {
        width: '100%',
        height: '100% !important',
        objectFit: 'cover',
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
