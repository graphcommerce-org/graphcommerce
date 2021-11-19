import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import SidebarMenu from '../../components/SidebarMenu'
import { DirectoryTree } from '../../util/files'
import { responsiveVal } from '@graphcommerce/next-ui'

export type LayoutProps = { menuData: DirectoryTree; children: React.ReactElement }

const useStyles = makeStyles(
  (theme: Theme) => ({
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 4fr',
      gridColumnGap: theme.spacings.md,
      maxWidth: '100%',
    },
    side: {
      position: 'sticky',
      top: theme.page.headerInnerHeight.md,
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'auto',
      minWidth: responsiveVal(150, 300),
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    content: {
      '& > *': {
        wordBreak: 'break-all',
      },
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
