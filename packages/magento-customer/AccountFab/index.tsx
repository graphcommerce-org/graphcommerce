import { useQuery } from '@apollo/client'
import { Badge, Fab, makeStyles, NoSsr, Theme } from '@material-ui/core'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconPersonAlt } from '@reachdigital/next-ui/icons'
import PageLink from 'next/link'
import React from 'react'
import { CustomerTokenDocument, CustomerTokenQuery } from '../CustomerToken.gql'

const useStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
}))

type CustomerFabContentProps = CustomerTokenQuery & { icon?: React.ReactNode }

function CustomerFabContent(props: CustomerFabContentProps) {
  const { customerToken, icon } = props
  const classes = useStyles()
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <PageLink href={requireAuth ? '/account/signin' : '/account'} passHref>
      <Fab style={{ boxShadow: 'none' }} aria-label='Open Menu' size='medium'>
        {/* <IconButton aria-label='Account' color='inherit' size='medium'> */}
        <Badge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          classes={classes}
        >
          {icon ?? <SvgImage src={iconPersonAlt} alt='Account' loading='eager' />}
        </Badge>
      </Fab>
      {/* </IconButton> */}
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
