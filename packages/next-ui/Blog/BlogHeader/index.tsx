import React from 'react'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { makeStyles } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'BlogHeader' })((theme) => ({
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
}))

export type BlogHeaderProps = UseStyles<typeof useStyles> & {
  asset?: React.ReactNode
}

export function BlogHeader(props: BlogHeaderProps) {
  const { asset } = props
  const { classes } = useStyles()

  return (
    <div className={classes.header}>{asset && <div className={classes.asset}>{asset}</div>}</div>
  )
}
