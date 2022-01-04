import { UseStyles } from '@graphcommerce/next-ui'
import { Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.sm,
      textAlign: 'center',
    },
  }),
  {
    name: 'NoSearchResults',
  },
)

export type NoSearchResultsProps = { search: string } & UseStyles<typeof useStyles>

export default function NoSearchResults(props: NoSearchResultsProps) {
  const { search } = props
  const classes = useStyles(props)

  return (
    <div className={classes.container}>
      <Typography variant='h5' align='center'>
        We couldn&apos;t find any results for {`'${search}'`}
      </Typography>
      <p>Try a different search</p>
    </div>
  )
}
