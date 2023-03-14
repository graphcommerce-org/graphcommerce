import { extendableComponent } from '@graphcommerce/next-ui'
import List from '@mui/material/List'
import { SxProps, Theme } from '@mui/material/styles'
import React from 'react'

export type AccountMenuProps = { children: React.ReactNode; sx?: SxProps<Theme> }

const { classes } = extendableComponent('AccountMenu', ['root'] as const)

export function AccountMenu(props: AccountMenuProps) {
  const { children, sx = [] } = props

  return (
    <List
      classes={classes}
      disablePadding
      sx={[(theme) => ({ marginBottom: theme.spacings.lg }), ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </List>
  )
}
