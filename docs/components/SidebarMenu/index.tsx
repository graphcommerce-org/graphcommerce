import { List, ListSubheader } from '@mui/material'
import React from 'react'
import { ContentTree } from '../../util/files'

type SidebarMenuProps = { menuData: ContentTree }
export default function SidebarMenu(props: SidebarMenuProps) {
  const { menuData } = props

  return (
    <List component='nav' disablePadding>
      {menuData?.children?.map(({ name, children, path }) => (
        <React.Fragment key={name}>
          <ListSubheader component='div' disableSticky>
            {name}
          </ListSubheader>

          {children?.map((child) => (
            <SidebarMenu key={child.name} menuData={child} />
          ))}
        </React.Fragment>
      ))}
    </List>
  )
}
