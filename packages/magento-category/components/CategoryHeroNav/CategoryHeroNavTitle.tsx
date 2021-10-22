import { AppShellTitle } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      padding: 0,
    },
    title: {
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        alignItems: 'start',
        justifyContent: 'end',
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

  return (
    <AppShellTitle classes={classes} variant='h2'>
      {children}
    </AppShellTitle>
  )
}
