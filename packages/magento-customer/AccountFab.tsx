import { useQuery } from '@apollo/client'
import { Badge, IconButton, makeStyles, NoSsr, Theme } from '@material-ui/core'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { PropsWithChildren } from 'react'
import { SetRequired } from 'type-fest'
import { CustomerTokenQuery, CustomerTokenDocument } from './CustomerToken.gql'

const useBadgeStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
}))

type CustomerFabContentProps = SetRequired<PropsWithChildren<CustomerTokenQuery>, 'children'>

function CustomerFabContent(props: CustomerFabContentProps) {
  const { customerToken, children } = props
  const badgeClasses = useBadgeStyles()
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <PageLink href={requireAuth ? '/account/signin' : '/account'}>
      <IconButton aria-label='Account' color='inherit' size='medium'>
        <Badge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          classes={badgeClasses}
        >
          {children}
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
