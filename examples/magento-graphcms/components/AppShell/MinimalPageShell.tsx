import { FullPageShellBaseProps } from '@graphcommerce/next-ui'
import MinimalPageShellBase from '@graphcommerce/next-ui/AppShell/MinimalPageShellBase'
import React from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import Footer from './Footer'
import Logo from './Logo'

export type MinimalPageShellProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<FullPageShellBaseProps, 'header' | 'footer'>

export default function MinimalPageShell(props: MinimalPageShellProps) {
  const { footer, menu, children, ...uiProps } = props

  return (
    <MinimalPageShellBase {...uiProps} header={<Logo />} footer={<Footer footer={footer} />}>
      {children}
    </MinimalPageShellBase>
  )
}
