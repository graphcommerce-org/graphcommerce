import { Avatar, makeStyles, Theme, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import { AccountHeaderFragment } from './AccountHeader.gql'

export type AccountHeaderProps = AccountHeaderFragment & {
  loading: boolean
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      background: theme.palette.background.highlight,
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
      margin: `0 auto ${theme.spacings.xs} auto`,
      fontSize: 24,
      paddingLeft: 1,
      lineHeight: 'normal',
    },
  }),
  { name: 'AccountHeader' },
)

export default function AccountHeader(props: AccountHeaderProps) {
  const { firstname, lastname, loading } = props
  const classes = useStyles()

  if (loading) {
    return (
      <div className={classes.header}>
        <div>
          <Skeleton className={classes.avatar} variant='circle' width={40} height={40} />
          <Skeleton variant='rect' width={164} height={40} />
        </div>
      </div>
    )
  }

  return (
    <div className={classes.header}>
      <div>
        <Avatar className={classes.avatar}>
          {`${firstname?.charAt(0)}${lastname?.charAt(0)}`.toUpperCase()}
        </Avatar>
        <Typography variant='h3'>
          {firstname} {lastname}
        </Typography>
      </div>
    </div>
  )
}
