import { makeStyles, Theme } from '@material-ui/core'
import { AppShellTitle } from '@reachdigital/next-ui'
import React from 'react'

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
