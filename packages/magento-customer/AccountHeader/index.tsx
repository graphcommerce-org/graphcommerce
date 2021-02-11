import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { AccountHeaderFragment } from './AccountHeader.gql'

export type AccountHeaderProps = AccountHeaderFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    avatar: {
      background: theme.palette.primary.main,
    },
    capitalize: {
      textTransform: 'capitalize',
    },
  }),
  { name: 'AccountDashboard' },
)

export default function AccountHeader(props: AccountHeaderProps) {
  const { firstname, lastname } = props
  const classes = useStyles()

  const firstName = firstname
  const lastName = lastname

  return (
    <div>
      <Typography variant='h3'>
        <span className={classes.capitalize}>{firstName?.toLowerCase()}</span>
        <span className={classes.capitalize}>{lastName?.toLowerCase()}</span>
      </Typography>
      <Avatar className={classes.avatar}>SW</Avatar>
    </div>
  )
}
