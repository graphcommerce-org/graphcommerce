import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { SxProps, Theme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React from 'react'
import { extendableComponent } from '../Styles'
import { NextLink } from '../Theme'

export type FabMenuSecondaryItemProps = {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
  sx?: SxProps<Theme>
}

const compName = 'MenuFabSecondaryItem' as const
const parts = ['root', 'icon', 'text'] as const
const { classes } = extendableComponent(compName, parts)

export function MenuFabSecondaryItem(props: FabMenuSecondaryItemProps) {
  const { href, children, icon, sx = [] } = props
  const router = useRouter()

  return (
    <ListItemButton
      href={href}
      component={NextLink}
      className={classes.root}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
      dense
      selected={router.asPath.startsWith(href)}
    >
      <ListItemIcon className={classes.text} sx={{ paddingRight: '8px', minWidth: 'unset' }}>
        {icon}
      </ListItemIcon>
      <ListItemText className={classes.icon}>{children}</ListItemText>
    </ListItemButton>
  )
}
