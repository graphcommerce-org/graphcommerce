import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      maxWidth: 800,
      margin: `0 auto`,
      marginBottom: theme.spacings.md,
    },
    asset: {
      '& img': {
        borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
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
