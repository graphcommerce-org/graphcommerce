import { useQuery } from '@graphcommerce/graphql'
import {
  iconPerson,
  DesktopHeaderBadge,
  IconSvg,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Fab, FabProps as FabPropsType, NoSsr, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { CustomerTokenDocument, CustomerTokenQuery } from '../../hooks'

type CustomerFabContentProps = CustomerTokenQuery & {
  icon?: React.ReactNode
  authHref: string
  guestHref: string
  FabProps?: Omit<FabPropsType, 'children'>
  sx?: SxProps<Theme>
}

const name = 'CustomerFab'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

function CustomerFabContent(props: CustomerFabContentProps) {
  const { customerToken, icon, guestHref, authHref, FabProps, sx } = props
  const requireAuth = Boolean(!customerToken || !customerToken.valid)

  return (
    <PageLink href={requireAuth ? guestHref : authHref} passHref>
      <Fab
        color='inherit'
        id='account'
        aria-label={i18n._(/* i18n */ `Account`)}
        size='large'
        className={classes.root}
        {...FabProps}
        sx={sx}
      >
        <DesktopHeaderBadge
          badgeContent={customerToken?.token ? 1 : 0}
          color={customerToken?.valid ? 'primary' : 'error'}
          variant='dot'
          overlap='circular'
        >
          {icon ?? <IconSvg src={iconPerson} size='large' />}
        </DesktopHeaderBadge>
      </Fab>
    </PageLink>
  )
}

export function CustomerFab(props: CustomerFabContentProps) {
  const { data } = useQuery(CustomerTokenDocument)

  return (
    <NoSsr fallback={<CustomerFabContent {...props} />}>
      <CustomerFabContent customerToken={data?.customerToken} {...props} />
    </NoSsr>
  )
}
