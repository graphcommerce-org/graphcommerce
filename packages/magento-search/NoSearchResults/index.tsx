import { UseStyles, makeStyles, useMergedClasses } from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import React from 'react'

const useStyles = makeStyles({ name: 'NoSearchResults' })((theme) => ({
  container: {
    marginTop: theme.spacings.md,
    marginBottom: theme.spacings.sm,
    textAlign: 'center',
  },
}))

export type NoSearchResultsProps = { search: string } & UseStyles<typeof useStyles>

export default function NoSearchResults(props: NoSearchResultsProps) {
  const { search } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <div className={classes.container}>
      <Typography variant='h5' align='center'>
        We couldn&apos;t find any results for {`'${search}'`}
      </Typography>
      <p>Try a different search</p>
    </div>
  )
}
