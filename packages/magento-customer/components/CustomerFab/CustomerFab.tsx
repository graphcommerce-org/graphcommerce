import {
  Fab,
  iconPerson,
  DesktopHeaderBadge,
  IconSvg,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { FabProps, NoSsr, SxProps, Theme } from '@mui/material'
import React from 'react'
import { useCustomerSession, UseCustomerSessionReturn } from '../../hooks'

type CustomerFabContentProps = {
  icon?: React.ReactNode
  authHref: string
  guestHref: string
  FabProps?: Omit<FabProps, 'children'>
  sx?: SxProps<Theme>
  session?: UseCustomerSessionReturn
}

const name = 'CustomerFab'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

function CustomerFabContent(props: CustomerFabContentProps) {
  const { session, icon, guestHref, authHref, FabProps, sx } = props

  return (
    <Fab
      href={session?.requireAuth ? guestHref : authHref}
      color='inherit'
      id='account'
      aria-label={i18n._(/* i18n */ 'Account')}
      size='large'
      className={classes.root}
      {...FabProps}
      sx={sx}
    >
      <DesktopHeaderBadge
        badgeContent={session?.token ? 1 : 0}
        color={session?.valid ? 'primary' : 'error'}
        variant='dot'
        overlap='circular'
      >
        {icon ?? <IconSvg src={iconPerson} size='large' />}
      </DesktopHeaderBadge>
    </Fab>
  )
}

export type CustomerFabProps = Omit<CustomerFabContentProps, 'session'>

export function CustomerFab(props: CustomerFabProps) {
  const session = useCustomerSession()

  return (
    <NoSsr fallback={<CustomerFabContent {...props} />}>
      <CustomerFabContent session={session} {...props} />
    </NoSsr>
  )
}
