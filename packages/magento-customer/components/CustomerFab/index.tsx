import { useQuery } from '@apollo/client'
import { iconPerson, StyledBadge, SvgImageSimple, UseStyles } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Fab, FabProps as FabPropsType, makeStyles, NoSsr, Theme } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import { CustomerTokenDocument, CustomerTokenQuery } from '../../hooks'

const useStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
}))

type CustomerFabContentProps = CustomerTokenQuery & {
  icon?: React.ReactNode
  authHref: string
  guestHref: string
  FabProps?: Omit<FabPropsType, 'children'>
} & UseStyles<typeof useStyles>

function CustomerFabContent(props: CustomerFabContentProps) {
  const { customerToken, icon, guestHref, authHref, FabProps } = props
  const classes = useStyles(props)
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <PageLink href={requireAuth ? guestHref : authHref} passHref>
      <Fab color='inherit' aria-label={t`Account`} size='large' {...FabProps}>
        <StyledBadge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          classes={{ colorError: classes.colorError }}
        >
          {icon ?? <SvgImageSimple src={iconPerson} size='large' />}
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
