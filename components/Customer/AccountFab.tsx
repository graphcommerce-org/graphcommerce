import { Badge, Fab, makeStyles, NoSsr, Theme } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/PersonOutline'
import { useCustomerTokenQuery } from 'generated/apollo'
import Link from 'next/link'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
}))

export default function CustomerFab() {
  const classes = useStyles()
  const { data } = useCustomerTokenQuery()

  const requireAuth = Boolean(!data?.customerToken || !data?.customerToken.valid)
  const fab = (
    <Link passHref href={requireAuth ? '/account/signin' : '/account'}>
      <Fab aria-label='Account' size='medium'>
        <PersonIcon />
      </Fab>
    </Link>
  )

  return (
    <NoSsr fallback={fab}>
      <Badge
        badgeContent={data?.customerToken?.token ? 1 : 0}
        color={data?.customerToken?.valid ? 'primary' : 'error'}
        overlap='circle'
        variant='dot'
        classes={classes}
      >
        {fab}
      </Badge>
    </NoSsr>
  )
}
