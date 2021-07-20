import { useQuery } from '@apollo/client'
import { Fab, makeStyles, NoSsr, Theme } from '@material-ui/core'
import { iconPersonAlt, StyledBadge, SvgImage, UseStyles } from '@reachdigital/next-ui'
import PageLink from 'next/link'
import React from 'react'
import { CustomerTokenDocument, CustomerTokenQuery } from '../CustomerToken.gql'

const useStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
}))

type CustomerFabContentProps = CustomerTokenQuery & {
  icon?: React.ReactNode
  authHref: string
  guestHref: string
} & UseStyles<typeof useStyles>

function CustomerFabContent(props: CustomerFabContentProps) {
  const { customerToken, icon, guestHref, authHref } = props
  const classes = useStyles(props)
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <PageLink href={requireAuth ? guestHref : authHref} passHref>
      <Fab style={{ boxShadow: 'none' }} aria-label='Open Menu' size='large'>
        <StyledBadge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          classes={{ colorError: classes.colorError }}
        >
          {icon ?? <SvgImage src={iconPersonAlt} alt='Account' />}
        </StyledBadge>
      </Fab>
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
