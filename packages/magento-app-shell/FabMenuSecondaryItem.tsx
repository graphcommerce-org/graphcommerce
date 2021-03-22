import { ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import router from 'next/router'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    listItemText: {},
    icon: { minWidth: 30 },
  }),
  { name: 'FabMenuSecondaryItem' },
)

type FabMenuSecondaryItemProps = { iconSrc: string; href: string; children: React.ReactNode }

export default function FabMenuSecondaryItem(props: FabMenuSecondaryItemProps) {
  const { iconSrc, href, children } = props
  const classes = useStyles()
  return (
    <PageLink href={href}>
      <ListItem dense button selected={router.asPath.startsWith(href)}>
        <ListItemIcon classes={{ root: classes.icon }}>
          <img src={iconSrc} alt='' width={24} height={24} loading='lazy' />
        </ListItemIcon>
        <ListItemText primary={children} classes={{ primary: classes.listItemText }} />
      </ListItem>
    </PageLink>
  )
}
