import { ListItem, ListItemIcon, ListItemText, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import router from 'next/router'
import React from 'react'
import { extendableComponent } from '../Styles'

export type FabMenuSecondaryItemProps = {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
  sx?: SxProps<Theme>
}

const compName = 'MenuFabSecondaryItem' as const
const slots = ['root', 'icon', 'text'] as const
const { classes } = extendableComponent(compName, slots)

export function MenuFabSecondaryItem(props: FabMenuSecondaryItemProps) {
  const { href, children, icon, sx = [] } = props

  return (
    <PageLink href={href} passHref>
      <ListItem
        className={classes.root}
        sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
        component='a'
        dense
        button
        selected={router.asPath.startsWith(href)}
      >
        <ListItemIcon className={classes.text}>{icon}</ListItemIcon>
        <ListItemText className={classes.icon}>{children}</ListItemText>
      </ListItem>
    </PageLink>
  )
}
