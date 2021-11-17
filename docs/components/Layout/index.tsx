import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import SidebarMenu from '../../components/SidebarMenu'
import { DirectoryTree } from '../../util/files'

export type LayoutProps = { menuData: DirectoryTree; children: React.ReactElement[] }

const useStyles = makeStyles(
  (theme: Theme) => ({
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 4fr',
      gridColumnGap: theme.spacings.md,
    },
    menu: {
      position: 'sticky',
      top: theme.page.headerInnerHeight.md,
      height: '100vh',
      overflow: 'hidden',
      borderRight: `1px solid ${theme.palette.primary.contrastText}`,
    },
    content: {},
    listItemText: {
      ...theme.typography.caption,
    },
  }),
  {
    name: 'Layout',
  },
)

export default function Layout(props: LayoutProps) {
  const { menuData, children } = props
  const classes = useStyles()

  return (
    <div className={classes.grid}>
      <SidebarMenu tree={menuData} />
      <div className={classes.content}>{children}</div>
    </div>
  )
}
