import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import PageLink from 'next/link'
import router from 'next/router'
import React from 'react'

const useStyles = makeStyles(
  {
    listItemText: {},
    icon: { minWidth: 30 },
  },
  { name: 'FabMenuSecondaryItem' },
)

export type FabMenuSecondaryItemProps = {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
}

export function MenuFabSecondaryItem(props: FabMenuSecondaryItemProps) {
  const { href, children, icon } = props
  const classes = useStyles()

  return (
    <PageLink href={href} passHref>
      <ListItem component='a' dense button selected={router.asPath.startsWith(href)}>
        <ListItemIcon classes={{ root: classes.icon }}>{icon}</ListItemIcon>
        <ListItemText primary={children} classes={{ primary: classes.listItemText }} />
      </ListItem>
    </PageLink>
  )
}
