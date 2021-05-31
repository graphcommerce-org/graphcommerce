import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import FullPageShellBase, {
  FullPageShellBaseProps,
} from '@reachdigital/next-ui/AppShell/FullPageShellBase'
import React from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import Footer from './Footer'
import Logo from './Logo'

export type PageShellProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<FullPageShellBaseProps, 'menu' | 'logo' | 'actions' | 'classes' | 'name'>

function PageShell(props: PageShellProps) {
  const { footer, menu, children, ...uiProps } = props
  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  return (
    <FullPageShellBase {...uiProps} name={name} header={<Logo />}>
      {children}
      <Footer footer={footer} />
    </FullPageShellBase>
  )
}

export default PageShell
