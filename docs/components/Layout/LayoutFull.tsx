import {
  DesktopNavBar,
  DesktopNavItem,
  LayoutDefault,
  LayoutDefaultProps,
  MenuFab,
  MenuFabItem,
} from '@graphcommerce/next-ui'
import { Container } from '@mui/material'
import Logo from '../AppShell/Logo'

export type LayoutFullProps = Omit<
  LayoutDefaultProps,
  'pages' | 'classes' | 'header' | 'cartFab' | 'menuFab' | 'footer'
>

export function LayoutFull(props: LayoutFullProps) {
  const { children } = props

  return (
    <LayoutDefault
      header={
        <>
          <Logo />
          <DesktopNavBar>
            <DesktopNavItem href='/'>Documentation</DesktopNavItem>
          </DesktopNavBar>
        </>
      }
      footer={<Container>&copy; GraphCommerce</Container>}
      menuFab={
        <MenuFab>
          <MenuFabItem href='/'>Documentation</MenuFabItem>
        </MenuFab>
      }
    >
      {children}
    </LayoutDefault>
  )
}
