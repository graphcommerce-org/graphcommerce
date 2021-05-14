import { makeStyles, Theme, Typography } from '@material-ui/core'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { iconSadFace } from '@reachdigital/next-ui/icons'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.sm,
    },
  }),
  {
    name: 'NoSearchResults',
  },
)

export type NoSearchResultsProps = Record<string, never>

export default function NoSearchResults() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography variant='h5' align='center'>
        <IconHeader src={iconSadFace} title='No results' alt='no results' size='large' />
      </Typography>
    </div>
  )
}
