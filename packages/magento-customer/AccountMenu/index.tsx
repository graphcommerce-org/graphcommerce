import { List, makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginTop: theme.spacings.lg,
      marginBottom: theme.spacings.lg,
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacings.md,
        marginBottom: theme.spacings.md,
      },
    },
  }),
  { name: 'AccountMenu' },
)

type AccountMenuProps = UseStyles<typeof useStyles> & { children: React.ReactNode }

export default function AccountMenu(props: AccountMenuProps) {
  const { children } = props
  const classes = useStyles(props)

  return <List className={classes.root}>{children}</List>
}
