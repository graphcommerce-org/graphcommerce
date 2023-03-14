import { MenuFabSecondaryItem, iconPerson, IconSvg } from '@graphcommerce/next-ui'
import Badge from '@mui/material/Badge'
import NoSsr from '@mui/material/NoSsr'
import { SxProps, Theme } from '@mui/material/styles'
import React from 'react'
import { useCustomerSession, UseCustomerSessionReturn } from '../../hooks/useCustomerSession'

type CustomerMenuFabItemProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  authHref: string
  guestHref: string
  sx?: SxProps<Theme>
  session?: UseCustomerSessionReturn
}

function CustomerMenuFabItemContent(props: CustomerMenuFabItemProps) {
  const { session, icon, children, guestHref, authHref, sx = [] } = props

  return (
    <MenuFabSecondaryItem
      sx={sx}
      icon={
        <Badge
          badgeContent={session?.token ? 1 : 0}
          color={session?.valid ? 'primary' : 'error'}
          variant='dot'
          overlap='circular'
        >
          {icon ?? <IconSvg src={iconPerson} size='medium' />}
        </Badge>
      }
      href={session?.requireAuth ? guestHref : authHref}
    >
      {children}
    </MenuFabSecondaryItem>
  )
}

export function CustomerMenuFabItem(props: CustomerMenuFabItemProps) {
  const session = useCustomerSession()

  return (
    <NoSsr fallback={<CustomerMenuFabItemContent {...props} />}>
      <CustomerMenuFabItemContent session={session} {...props} />
    </NoSsr>
  )
}
