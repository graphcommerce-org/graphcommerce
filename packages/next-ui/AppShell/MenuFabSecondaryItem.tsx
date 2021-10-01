import { ListItem, ListItemIcon, ListItemText, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PageLink from 'next/link'
import router from 'next/router'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    listItemText: {},
    icon: { minWidth: 30 },
  }),
  { name: 'FabMenuSecondaryItem' },
)

export type FabMenuSecondaryItemProps = {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
}

export default function MenuFabSecondaryItem(props: FabMenuSecondaryItemProps) {
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
