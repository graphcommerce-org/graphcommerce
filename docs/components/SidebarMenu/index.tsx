import { List, ListItem, ListItemText, ListSubheader, makeStyles, Theme } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import { FileNameUrlKeyPair } from './sanitizeDirectoryTree'
import { responsiveVal } from '@graphcommerce/next-ui'

const useStyles = makeStyles(
  (theme: Theme) => ({
    menu: {
      position: 'sticky',
      top: theme.page.headerInnerHeight.md,
      height: '100vh',
      overflow: 'hidden',
      borderRight: `1px solid ${theme.palette.primary.contrastText}`,
      minWidth: responsiveVal(150, 300),
    },
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
    <div className={classes.menu}>
      <List component='nav'>
        {tree.map(([dirName, filenames]: [string, FileNameUrlKeyPair[]]) => (
          <React.Fragment key={dirName}>
            <ListSubheader component='div'>{dirName}</ListSubheader>
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
    </div>
  )
}
