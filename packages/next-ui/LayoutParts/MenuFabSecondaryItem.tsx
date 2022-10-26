import { ListItemButton, ListItemIcon, ListItemText, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { extendableComponent } from '../Styles'

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
    <PageLink href={href} passHref legacyBehavior>
      <ListItemButton
        className={classes.root}
        sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
        component='a'
        dense
        selected={router.asPath.startsWith(href)}
      >
        <ListItemIcon className={classes.text} sx={{ paddingRight: '8px', minWidth: 'unset' }}>
          {icon}
        </ListItemIcon>
        <ListItemText className={classes.icon}>{children}</ListItemText>
      </ListItemButton>
    </PageLink>
  )
}
