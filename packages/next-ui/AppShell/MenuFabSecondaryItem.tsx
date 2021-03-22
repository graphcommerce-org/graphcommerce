import { ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core'
import router from 'next/router'
import React from 'react'
import PageLink from '../PageTransition/PageLink'
import PictureResponsiveNext, { PictureResponsiveNextProps } from '../PictureResponsiveNext'

const useStyles = makeStyles(
  (theme: Theme) => ({
    listItemText: {},
    icon: { minWidth: 30 },
  }),
  { name: 'FabMenuSecondaryItem' },
)

type FabMenuSecondaryItemProps = {
  href: string
  children: React.ReactNode
} & Omit<PictureResponsiveNextProps, 'width' | 'height' | 'loading' | 'alt'>

export default function MenuFabSecondaryItem(props: FabMenuSecondaryItemProps) {
  const { href, children, ...imgProps } = props
  const classes = useStyles()
  return (
    <PageLink href={href}>
      <ListItem dense button selected={router.asPath.startsWith(href)}>
        <ListItemIcon classes={{ root: classes.icon }}>
          <PictureResponsiveNext {...imgProps} alt='' width={24} height={24} loading='lazy' />
        </ListItemIcon>
        <ListItemText primary={children} classes={{ primary: classes.listItemText }} />
      </ListItem>
    </PageLink>
  )
}
