import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { FullPageShellBaseProps } from '@graphcommerce/next-ui'
import MinimalPageShellBase from '@graphcommerce/next-ui/AppShell/MinimalPageShellBase'
import React from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import Footer from './Footer'
import Logo from './Logo'

export type MinimalPageShellProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<
    FullPageShellBaseProps,
    'menu' | 'logo' | 'actions' | 'classes' | 'name' | 'header' | 'footer'
  >

export default function MinimalPageShell(props: MinimalPageShellProps) {
  const { footer, menu, children, ...uiProps } = props
  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  return (
    <MinimalPageShellBase {...uiProps} header={<Logo />} footer={<Footer footer={footer} />}>
      {children}
    </MinimalPageShellBase>
  )
}
