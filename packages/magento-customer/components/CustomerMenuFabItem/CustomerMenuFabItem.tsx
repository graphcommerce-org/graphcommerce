import { useQuery } from '@graphcommerce/graphql'
import { MenuFabSecondaryItem, iconPerson, IconSvg } from '@graphcommerce/next-ui'
import { Badge, NoSsr, SxProps, Theme } from '@mui/material'
import React from 'react'
import { CustomerTokenDocument, CustomerTokenQuery } from '../../hooks'

type CustomerMenuFabItemProps = CustomerTokenQuery & {
  icon?: React.ReactNode
  children: React.ReactNode
  authHref: string
  guestHref: string
  sx?: SxProps<Theme>
}

function CustomerMenuFabItemContent(props: CustomerMenuFabItemProps) {
  const { customerToken, icon, children, guestHref, authHref, sx = [] } = props
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <MenuFabSecondaryItem
      sx={sx}
      icon={
        <Badge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          overlap='circular'
        >
          {icon ?? <IconSvg src={iconPerson} size='medium' />}
        </Badge>
      }
      href={requireAuth ? guestHref : authHref}
    >
      {children}
    </MenuFabSecondaryItem>
  )
}

export function CustomerMenuFabItem(props: CustomerMenuFabItemProps) {
  const { data } = useQuery(CustomerTokenDocument)

  return (
    <NoSsr fallback={<CustomerMenuFabItemContent {...props} />}>
      <CustomerMenuFabItemContent customerToken={data?.customerToken} {...props} />
    </NoSsr>
  )
}
