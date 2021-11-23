import { List, ListItem, ListItemText, ListSubheader, makeStyles, Theme } from '@material-ui/core'
import PageLink from 'next/link'
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

  return (
    <List component='nav'>
      {tree.map(([dirName, filenames]: [string, FileNameUrlKeyPair[]]) => (
        <React.Fragment key={dirName}>
          <ListSubheader component='div' disableSticky>
            {dirName}
          </ListSubheader>
          {filenames.map(({ name, urlKey }: FileNameUrlKeyPair) => (
            <PageLink href={`/read/${urlKey}`} key={urlKey} passHref>
              <ListItem button className={classes.listItem}>
                <ListItemText primary={<span className={classes.listItemText}>{name}</span>} />
              </ListItem>
            </PageLink>
          ))}
        </React.Fragment>
      ))}
    </List>
  )
}
