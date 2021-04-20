import { makeStyles, Theme, Typography } from '@material-ui/core'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import React from 'react'
import sadFace from './sad_face.svg'

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
        <IconTitle iconSrc={sadFace} title='No results' alt='no results' size='large' />
      </Typography>
    </div>
  )
}
