import type { SxProps, Theme } from '@mui/material'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import type { MouseEventHandler } from 'react'
import React from 'react'
import { extendableComponent } from '../Styles'
import { NextLink } from '../Theme'

export type FabMenuSecondaryItemProps = {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
  sx?: SxProps<Theme>
  onClick?: MouseEventHandler<HTMLElement>
}

const compName = 'MenuFabSecondaryItem'
const parts = ['root', 'icon', 'text'] as const
const { classes } = extendableComponent(compName, parts)

export function MenuFabSecondaryItem(props: FabMenuSecondaryItemProps) {
  const { href, children, onClick, icon, sx = [] } = props
  const router = useRouter()

  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault()
    onClick?.(e)
    return router.push(href)
  }

  return (
    <ListItemButton
      onClick={handleClick}
      component={NextLink}
      className={classes.root}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
      dense
      selected={router.asPath.startsWith(href)}
    >
      {icon && (
        <ListItemIcon className={classes.text} sx={{ paddingRight: '8px', minWidth: 'unset' }}>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText className={classes.icon}>{children}</ListItemText>
    </ListItemButton>
  )
}
