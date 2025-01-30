import { iconPerson, IconSvg, MenuFabSecondaryItem } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Badge, NoSsr } from '@mui/material'
import type { MouseEventHandler } from 'react'
import React from 'react'
import { useCustomerAccountCanSignIn } from '../../hooks'
import type { UseCustomerSessionReturn } from '../../hooks/useCustomerSession'
import { useCustomerSession } from '../../hooks/useCustomerSession'

export type CustomerMenuFabItemProps = {
  icon?: React.ReactNode
  children: React.ReactNode
  authHref: string
  guestHref: string
  sx?: SxProps<Theme>
  session?: UseCustomerSessionReturn
  onClick?: MouseEventHandler<HTMLElement>
}

function CustomerMenuFabItemContent(props: CustomerMenuFabItemProps) {
  const { session, icon, children, onClick, guestHref, authHref, sx = [] } = props

  return (
    <MenuFabSecondaryItem
      onClick={onClick}
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
      href={session?.loggedIn ? authHref : guestHref}
    >
      {children}
    </MenuFabSecondaryItem>
  )
}

export function CustomerMenuFabItem(props: CustomerMenuFabItemProps) {
  const session = useCustomerSession()

  const canSignIn = useCustomerAccountCanSignIn()
  if (!canSignIn) return null

  return (
    <NoSsr fallback={<CustomerMenuFabItemContent {...props} />}>
      <CustomerMenuFabItemContent session={session} {...props} />
    </NoSsr>
  )
}
