import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { FullPageShellBaseProps } from '@reachdigital/next-ui'
import MinimalPageShellBase from '@reachdigital/next-ui/AppShell/FullPageShellBase'
import React from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import Logo from './Logo'

export type MinimalPageShellProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<FullPageShellBaseProps, 'menu' | 'logo' | 'actions' | 'classes' | 'name'>

export default function MinimalPageShell(props: MinimalPageShellProps) {
  const { footer, menu, children, ...uiProps } = props
  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  return (
    <MinimalPageShellBase {...uiProps} name={name} header={<Logo />}>
      {children}
      {/* <Footer footer={footer} /> */}
    </MinimalPageShellBase>
  )
}
