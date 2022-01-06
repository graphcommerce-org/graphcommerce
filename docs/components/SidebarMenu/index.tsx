import { makeStyles, typography } from '@graphcommerce/next-ui'
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FileNameUrlKeyPair } from './sanitizeDirectoryTree'

const useStyles = makeStyles({ name: 'SidebarMenu' })((theme) => ({
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemText: {
    ...typography(theme, 'caption'),
  },
}))

export default function SidebarMenu(props) {
  const { tree } = props
  const { classes } = useStyles()
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
