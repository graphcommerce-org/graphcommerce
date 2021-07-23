import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { AppShellTitle } from '../next-ui'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginTop: 0,
      marginBottom: 0,
    },
    container: {
      padding: 0,
    },
    title: {
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
      },
    },
  }),
  { name: 'CategoryHeroNavTitle' },
)

type CategoryHeroNavTitleProps = {
  children: React.ReactNode
}

export default function CategoryHeroNavTitle(props: CategoryHeroNavTitleProps) {
  const { children } = props
  const classes = useStyles()

  return <AppShellTitle classes={classes}>{children}</AppShellTitle>
}
