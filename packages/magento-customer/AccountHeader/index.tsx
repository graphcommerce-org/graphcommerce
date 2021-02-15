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
  { name: 'AccountHeader' },
)

export default function AccountHeader(props: AccountHeaderProps) {
  const { firstname, lastname } = props
  const classes = useStyles()

  return (
    <div>
      <Typography variant='h3'>
        <span className={classes.capitalize}>
          {firstname?.toLowerCase()} {lastname?.toLowerCase()}
        </span>
      </Typography>
      <Avatar className={classes.avatar}>
        {`${firstname?.charAt(0)}${lastname?.charAt(0)}`.toUpperCase()}
      </Avatar>
    </div>
  )
}
