import {
  DesktopNavBar,
  LayoutDefault,
  LayoutDefaultProps,
  MenuFab,
  MenuProps,
} from '@graphcommerce/next-ui'
import { Container } from '@material-ui/core'
import React from 'react'
import Logo from '../AppShell/Logo'

export type LayoutFullProps = Omit<
  LayoutDefaultProps,
  'pages' | 'classes' | 'header' | 'cartFab' | 'menuFab' | 'footer'
>

export function LayoutFull(props: LayoutFullProps) {
  const { children } = props

  const menuProps: MenuProps = { menu: [{ href: '/', children: `Documentation` }] }

  return (
    <LayoutDefault
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
    </LayoutDefault>
  )
}
