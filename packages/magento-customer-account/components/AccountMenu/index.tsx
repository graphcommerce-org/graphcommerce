import { UseStyles } from '@graphcommerce/next-ui'
import { List, makeStyles, Theme } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: theme.spacings.lg,
    },
  }),
  { name: 'AccountMenu' },
)

type AccountMenuProps = UseStyles<typeof useStyles> & { children: React.ReactNode }

export default function AccountMenu(props: AccountMenuProps) {
  const { children } = props
  const classes = useStyles(props)

  return (
    <List classes={classes} disablePadding>
      {children}
    </List>
  )
}
