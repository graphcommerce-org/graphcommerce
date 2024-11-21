import {
  iconPerson,
  DesktopHeaderBadge,
  IconSvg,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import type { BadgeProps, FabProps as FabPropsType, SxProps, Theme } from '@mui/material'
import { Fab, NoSsr } from '@mui/material'
import React from 'react'
import type { UseCustomerSessionReturn } from '../../hooks'
import { useCustomerAccountCanSignIn, useCustomerSession } from '../../hooks'

type CustomerFabContentProps = {
  icon?: React.ReactNode
  authHref: string
  guestHref: string
  FabProps?: Omit<FabPropsType, 'children'>
  sx?: SxProps<Theme>
  session?: UseCustomerSessionReturn
  BadgeProps?: BadgeProps
}

const name = 'CustomerFab'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

function CustomerFabContent(props: CustomerFabContentProps) {
  const { session, icon, guestHref, authHref, FabProps, sx, BadgeProps } = props

  return (
    <Fab
      href={session?.loggedIn ? authHref : guestHref}
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
        {...BadgeProps}
      >
        {icon ?? <IconSvg src={iconPerson} size='large' />}
      </DesktopHeaderBadge>
    </Fab>
  )
}

export type CustomerFabProps = Omit<CustomerFabContentProps, 'session'>

export function CustomerFab(props: CustomerFabProps) {
  const session = useCustomerSession()
  const canSignIn = useCustomerAccountCanSignIn()

  if (!canSignIn) return null

  return (
    <NoSsr fallback={<CustomerFabContent {...props} />}>
      <CustomerFabContent session={session} {...props} />
    </NoSsr>
  )
}
