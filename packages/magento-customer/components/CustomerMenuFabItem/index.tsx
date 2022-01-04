import { useQuery } from '@apollo/client'
import {
  MenuFabSecondaryItem,
  StyledBadge,
  UseStyles,
  iconPerson,
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import { NoSsr, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import { CustomerTokenDocument, CustomerTokenQuery } from '../../hooks'

const useStyles = makeStyles((theme: Theme) => ({
  colorError: {
    backgroundColor: theme.palette.grey['500'],
  },
  badge: {
    top: 3,
    right: 3,
    padding: 3,
    [theme.breakpoints.up('md')]: {
      top: 5,
      right: 7,
      padding: 4,
    },
  },
}))

type CustomerMenuFabItemProps = CustomerTokenQuery & {
  icon?: React.ReactNode
  children: React.ReactNode
  authHref: string
  guestHref: string
} & UseStyles<typeof useStyles>

function CustomerMenuFabItemContent(props: CustomerMenuFabItemProps) {
  const { customerToken, icon, children, guestHref, authHref } = props
  const classes = useStyles(props)
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <MenuFabSecondaryItem
      icon={
        <StyledBadge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          classes={{ colorError: classes.colorError, badge: classes.badge }}
        >
          {icon ?? <SvgImageSimple src={iconPerson} />}
        </StyledBadge>
      }
      href={requireAuth ? guestHref : authHref}
    >
      {children}
    </MenuFabSecondaryItem>
  )
}

export default function CustomerMenuFabItem(props: CustomerMenuFabItemProps) {
  const { data } = useQuery(CustomerTokenDocument)

  return (
    <NoSsr fallback={<CustomerMenuFabItemContent {...props} />}>
      <CustomerMenuFabItemContent customerToken={data?.customerToken} {...props} />
    </NoSsr>
  )
}
