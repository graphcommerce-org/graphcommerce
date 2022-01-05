import { LayoutTitle } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import React from 'react'

const useStyles = makeStyles({ name: 'CategoryHeroNavTitle' })((theme) => ({
  container: {
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      margin: 0,
      alignItems: 'start',
      justifyContent: 'end',
    },
  },
}))

type CategoryHeroNavTitleProps = {
  children: React.ReactNode
}

export default function CategoryHeroNavTitle(props: CategoryHeroNavTitleProps) {
  const { children } = props
  const { classes } = useStyles()

  return (
    <LayoutTitle classes={classes} variant='h1'>
      {children}
    </LayoutTitle>
  )
}
