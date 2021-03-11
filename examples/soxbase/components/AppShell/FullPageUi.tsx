import MenuTabs from '@reachdigital/magento-app-shell/MenuTabs'
import NextFullPageUi, {
  FullPageUiProps as NextFullPageUiProps,
} from '@reachdigital/next-ui/AppShell/FullPageUi'
import React from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import FabMenu from './FabMenu'
import Footer from './Footer'
import HeaderActions from './HeaderActions'
import Logo from './Logo'

type FullPageUiProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<NextFullPageUiProps, 'menu' | 'logo' | 'actions' | 'classes'>

function FullPageUi(props: FullPageUiProps) {
  const { footer, menu, children, ...uiProps } = props
  return (
    <NextFullPageUi
      {...uiProps}
      header={
        <>
          <Logo />
          <MenuTabs menu={menu} />
          <HeaderActions />
        </>
      }
    >
      <FabMenu menu={menu} />
      {children}
      <Footer footer={footer} />
    </NextFullPageUi>
  )
}
FullPageUi.holdBackground = false

export default FullPageUi
