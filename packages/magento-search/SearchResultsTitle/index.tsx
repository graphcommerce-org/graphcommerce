import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    title: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.sm,
    },
  }),
  {
    name: 'SearchResultTitle',
  },
)

type SearchResultTitleProps = { search: string }

export default function SearchResultTitle(props: SearchResultTitleProps) {
  const { search } = props
  const classes = useStyles()

  return (
    <div className={classes.title}>
      <Typography variant='h2' align='center'>
        Results for ‘{search}’
      </Typography>
    </div>
  )
}
