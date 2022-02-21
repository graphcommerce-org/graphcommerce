import {
  LayoutDefault,
  LayoutDefaultProps,
  MenuFab,
  MenuFabItem,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Container } from '@mui/material'
import { FileOrFolderNode } from '../../lib/files'
import SidebarMenu from '../SidebarMenu'
import { Logo } from './Logo'

export type LayoutFullProps = Omit<
  LayoutDefaultProps,
  'pages' | 'classes' | 'header' | 'cartFab' | 'menuFab' | 'footer'
> & { menuData?: FileOrFolderNode }

export function LayoutFull(props: LayoutFullProps) {
  const { children, menuData } = props

  return (
    <LayoutDefault
      header={<Logo />}
      footer={<Container>&copy; GraphCommerce</Container>}
      menuFab={
        <MenuFab>
          <MenuFabItem href='/'>Documentation</MenuFabItem>
        </MenuFab>
      }
      sx={{
        '& .LayoutDefault-children': {
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateColumns: `${responsiveVal(300, 320)} 1fr`,
        },
      }}
    >
      {menuData && <SidebarMenu {...menuData} />}
      <div>{children}</div>
    </LayoutDefault>
  )
}
