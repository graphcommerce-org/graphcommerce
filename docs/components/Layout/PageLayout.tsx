import { responsiveVal } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { DirectoryTree } from '../../util/files'
import SidebarMenu from '../SidebarMenu'

export type LayoutProps = { menuData: DirectoryTree; children: React.ReactNode }

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
      top: theme.appShell.appBarHeightMd,
      height: '100vh',
      '@supports (-webkit-touch-callout: none)': {
        height: '-webkit-fill-available',
      },
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

export default function PageLayout(props: LayoutProps) {
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
