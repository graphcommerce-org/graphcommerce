import { UseStyles, makeStyles } from '@graphcommerce/next-ui'
import { List, Theme } from '@mui/material'
import React from 'react'

const useStyles = makeStyles({ name: 'AccountMenu' })((theme) => ({
  root: {
    marginBottom: theme.spacings.lg,
  },
}))

type AccountMenuProps = UseStyles<typeof useStyles> & { children: React.ReactNode }

export default function AccountMenu(props: AccountMenuProps) {
  const { children } = props
  const { classes } = useStyles(props)

  return (
    <List classes={classes} disablePadding>
      {children}
    </List>
  )
}
