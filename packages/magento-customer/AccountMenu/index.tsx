import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    accountMenuContainer: {
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

  return <div className={classes.accountMenuContainer}>{children}</div>
}
