import { LayoutTitle } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        margin: 0,
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
    <LayoutTitle classes={classes} variant='h1'>
      {children}
    </LayoutTitle>
  )
}
