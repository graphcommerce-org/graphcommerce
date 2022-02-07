import { List, ListItem, ListItemText, ListSubheader } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FileNameUrlKeyPair } from './sanitizeDirectoryTree'

export default function SidebarMenu(props) {
  const { tree } = props
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
              <ListItem
                button
                className={classes.listItem}
                sx={{ py: 0 }}
                selected={router.asPath === urlKey}
              >
                <ListItemText
                  sx={{ typography: 'caption' }}
                  primary={<span className={classes.listItemText}>{name}</span>}
                />
              </ListItem>
            </PageLink>
          ))}
        </React.Fragment>
      ))}
    </List>
  )
}
