import { useQuery } from '@apollo/client'
import { Badge, IconButton, makeStyles, NoSsr, Theme } from '@material-ui/core'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconPerson } from '@reachdigital/next-ui/icons'
import PageLink from 'next/link'
import React from 'react'
import { CustomerTokenQuery, CustomerTokenDocument } from '../CustomerToken.gql'

const useBadgeStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
}))

type CustomerFabContentProps = CustomerTokenQuery & { icon?: React.ReactNode }

function CustomerFabContent(props: CustomerFabContentProps) {
  const { customerToken, icon } = props
  const classes = useBadgeStyles()
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <PageLink href={requireAuth ? '/account/signin' : '/account'} passHref>
      <IconButton aria-label='Account' color='inherit' size='medium'>
        <Badge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          classes={classes}
        >
          {icon ?? <SvgImage src={iconPerson} alt='Account' loading='eager' />}
        </Badge>
      </IconButton>
    </PageLink>
  )
}

export default function CustomerFab(props: CustomerFabContentProps) {
  const { data } = useQuery(CustomerTokenDocument)

  return (
    <NoSsr fallback={<CustomerFabContent {...props} />}>
      <CustomerFabContent customerToken={data?.customerToken} {...props} />
    </NoSsr>
  )
}
