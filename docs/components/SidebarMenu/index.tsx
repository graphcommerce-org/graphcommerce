import { List, ListItem, ListItemText, ListSubheader, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FileNameUrlKeyPair } from './sanitizeDirectoryTree'

const useStyles = makeStyles(
  (theme: Theme) => ({
    listItem: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    listItemText: {
      ...theme.typography.caption,
    },
  }),
  {
    name: 'SidebarMenu',
  },
)

export default function SidebarMenu(props) {
  const { tree } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <List component='nav' disablePadding>
      {tree.map(([dirName, filenames]: [string, FileNameUrlKeyPair[]]) => (
        <React.Fragment key={dirName}>
          <ListSubheader component='div' disableSticky>
            {dirName}
          </ListSubheader>
          {filenames.map(({ name, urlKey }: FileNameUrlKeyPair) => (
            <PageLink href={urlKey} key={urlKey} passHref>
              <ListItem button className={classes.listItem} selected={router.asPath === urlKey}>
                <ListItemText primary={<span className={classes.listItemText}>{name}</span>} />
              </ListItem>
            </PageLink>
          ))}
        </React.Fragment>
      ))}
    </List>
  )
}
