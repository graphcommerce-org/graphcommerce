import {
  DesktopNavBar,
  FullPageShellBase,
  FullPageShellBaseProps,
  MenuFab,
  MenuProps,
} from '@graphcommerce/next-ui'
import { Container } from '@material-ui/core'
import React from 'react'
import Logo from './Logo'

export type FullPageShellProps = Omit<
  FullPageShellBaseProps,
  'menu' | 'logo' | 'actions' | 'classes' | 'name' | 'header' | 'footer'
> & {
  alwaysShowLogo?: boolean
}

function FullPageShell(props: FullPageShellProps) {
  const { children, alwaysShowLogo } = props

  const menuProps: MenuProps = {
    menu: [{ href: '/', children: `Documentation` }],
  }

  return (
    <FullPageShellBase
      header={
        <>
          <Logo />
          <DesktopNavBar {...menuProps} />
        </>
      }
      footer={<Container>&copy; GraphCommerce</Container>}
      menuFab={<MenuFab {...menuProps} />}
    >
      {children}
    </FullPageShellBase>
  )
}

export default FullPageShell
