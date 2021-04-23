import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    gridArea: 'usps',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gap: theme.spacings.xs,
    alignContent: 'start',
    '& li': {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyItems: 'start',
      maxWidth: 'max-content',
      alignItems: 'center',
      gap: theme.spacings.xs,
      ...theme.typography.body1,
      '& > *': {
        display: 'grid',
        gridAutoFlow: 'column',
        maxWidth: 'max-content',
        alignItems: 'center',
      },
      '& img': {
        width: 38,
        height: 38,
      },
    },
  },
}))

export type UspsProps = UseStyles<typeof useStyles> & {
  children: React.ReactNode
}

export default function Usps(props: UspsProps) {
  const { children } = props
  const classes = useStyles()

  return <ul className={classes.root}>{children}</ul>
}
