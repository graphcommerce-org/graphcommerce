import { extendableComponent, sxx } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { List } from '@mui/material'
import React from 'react'

export type AccountMenuProps = { children: React.ReactNode; sx?: SxProps<Theme> }

const { classes } = extendableComponent('AccountMenu', ['root'] as const)

export function AccountMenu(props: AccountMenuProps) {
  const { children, sx = [] } = props

  return (
    <List
      classes={classes}
      disablePadding
      sx={sxx((theme) => ({ marginBottom: theme.spacings.lg }), sx)}
    >
      {children}
    </List>
  )
}
