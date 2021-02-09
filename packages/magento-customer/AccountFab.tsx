import { useQuery } from '@apollo/client'
import { Badge, IconButton, makeStyles, NoSsr, Theme } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/PersonOutline'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import React from 'react'
import { CustomerTokenQuery, CustomerTokenDocument } from './CustomerToken.gql'

const useBadgeStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
}))

type CustomerFabContentProps = {
  icon?: React.ReactNode
} & CustomerTokenQuery

function CustomerFabContent(props: CustomerFabContentProps) {
  const { customerToken, icon } = props
  const badgeClasses = useBadgeStyles()
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <PageLink href={requireAuth ? '/account/signin' : '/account'}>
      <IconButton aria-label='Account' color='inherit'>
        <Badge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          classes={badgeClasses}
        >
          {icon ?? <PersonIcon color='inherit' />}
        </Badge>
      </IconButton>
    </PageLink>
  )
}

export default function CustomerFab(props: CustomerFabContentProps) {
  const { data } = useQuery(CustomerTokenDocument)

  return (
    <NoSsr fallback={<CustomerFabContent />}>
      <CustomerFabContent customerToken={data?.customerToken} {...props} />
    </NoSsr>
  )
}
