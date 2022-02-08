import { List, ListItem, ListItemText, ListSubheader } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { DirectoryTree } from '../../util/files'
import { FileNameUrlKeyPair } from './sanitizeDirectoryTree'

type SidebarMenuProps = {
  tree: DirectoryTree
}

export default function SidebarMenu(props: SidebarMenuProps) {
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
              <ListItem button sx={{ py: 0 }} selected={router.asPath === urlKey}>
                <ListItemText sx={{ typography: 'caption' }} primary={<span>{name}</span>} />
              </ListItem>
            </PageLink>
          ))}
        </React.Fragment>
      ))}
    </List>
  )
}
