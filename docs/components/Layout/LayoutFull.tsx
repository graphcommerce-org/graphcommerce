import {
  LayoutDefault,
  LayoutDefaultProps,
  MenuFab,
  MenuFabItem,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Container, Box } from '@mui/material'
import { FileNode } from '../../lib/files'
import SidebarMenu from '../SidebarMenu'
import { Logo } from './Logo'

export type LayoutFullProps = Omit<
  LayoutDefaultProps,
  'pages' | 'classes' | 'header' | 'cartFab' | 'menuFab' | 'footer'
> & { menuData?: FileNode }

export function LayoutFull(props: LayoutFullProps) {
  const { children, menuData } = props

  return (
    <LayoutDefault
      header={<Logo />}
      footer=''
      menuFab={
        <MenuFab>
          <MenuFabItem href='/'>Documentation</MenuFabItem>
        </MenuFab>
      }
      sx={[
        (theme) => ({
          '& header': {
            p: 0,
          },
          '& header a': {
            [theme.breakpoints.up('md')]: {
              borderRight: `1px solid ${theme.palette.divider}`,
              width: `${responsiveVal(300, 320)}`,
            },
          },
          '& .LayoutDefault-children': {
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateColumns: `${responsiveVal(300, 320)} 1fr`,
            borderTop: `1px solid ${theme.palette.divider}`,
          },
        }),
      ]}
    >
      {menuData && <SidebarMenu {...menuData} />}
      <div>{children}</div>
    </LayoutDefault>
  )
}
