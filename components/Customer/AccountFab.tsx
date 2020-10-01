import { useQuery } from '@apollo/client'
import { Badge, IconButton, makeStyles, NoSsr, Theme } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/PersonOutline'
import { CustomerTokenDocument } from 'generated/documents'
import Link from 'next/link'
import React from 'react'

const useBadgeStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
}))

function CustomerFabContent({ customerToken }: GQLCustomerTokenQuery) {
  const badgeClasses = useBadgeStyles()
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <Link passHref href={requireAuth ? '/account/signin?back=1' : '/account'}>
      <IconButton aria-label='Account' color='inherit'>
        <Badge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          classes={badgeClasses}
        >
          <PersonIcon color='inherit' />
        </Badge>
      </IconButton>
    </Link>
  )
}

export default function CustomerFab() {
  const { data } = useQuery(CustomerTokenDocument)

  return (
    <NoSsr fallback={<CustomerFabContent />}>
      <CustomerFabContent customerToken={data?.customerToken} />
    </NoSsr>
  )
}
