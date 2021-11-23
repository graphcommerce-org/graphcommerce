import { responsiveVal } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import SidebarMenu from '../../components/SidebarMenu'
import { DirectoryTree } from '../../util/files'
import Logo from '../AppShell/Logo'

export type LayoutProps = { menuData: DirectoryTree; children: React.ReactNode }

const useStyles = makeStyles(
  (theme: Theme) => ({
    grid: {
      display: 'grid',
      gridTemplateColumns: `${responsiveVal(150, 300)} 4fr`,
      maxWidth: '100%',
    },
    side: {
      overflowY: 'auto',
      width: responsiveVal(150, 300),
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    content: {
      padding: theme.spacings.sm,
    },
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
      <div className={classes.side}>
        <SidebarMenu tree={menuData} />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  )
}
