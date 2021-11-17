import { List, ListItem, ListItemText, ListSubheader, makeStyles, Theme } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    menu: {
      position: 'sticky',
      top: theme.page.headerInnerHeight.md,
      height: '100vh',
      overflow: 'hidden',
      borderRight: `1px solid ${theme.palette.primary.contrastText}`,
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
        {Object.keys(tree).map((dirName) => (
          <React.Fragment key={dirName}>
            <ListSubheader component='div'>{dirName}</ListSubheader>
            {tree[dirName].map((filename) => {
              const filenameWithoutExt = filename.split('.')[0]

              return (
                <PageLink href={`/read/${dirName}/${filenameWithoutExt}`} passHref>
                  <ListItem button key={`${dirName}/${filename}`} className={classes.listItem}>
                    <ListItemText
                      primary={<span className={classes.listItemText}>{filenameWithoutExt}</span>}
                    />
                  </ListItem>
                </PageLink>
              )
            })}
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}
