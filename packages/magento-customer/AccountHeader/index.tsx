import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { AccountHeaderFragment } from './AccountHeader.gql'

export type AccountHeaderProps = AccountHeaderFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      background: '#F8F8F8',
      color: theme.palette.primary.main,
      borderRadius: theme.spacings.xs,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      minHeight: 400,
    },
    avatar: {
      background: theme.palette.primary.main,
      margin: 0,
      marginBottom: theme.spacings.xs,
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
    <div className={classes.header}>
      <div>
        <Avatar className={classes.avatar}>
          {`${firstname?.charAt(0)}${lastname?.charAt(0)}`.toUpperCase()}
        </Avatar>
        <Typography variant='h3'>
          <span className={classes.capitalize}>
            {firstname?.toLowerCase()} {lastname?.toLowerCase()}
          </span>
        </Typography>
      </div>
    </div>
  )
}
