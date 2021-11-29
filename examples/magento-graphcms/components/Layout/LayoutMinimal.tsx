import { FullPageShellBase, FullPageShellBaseProps } from '@graphcommerce/next-ui'
import React from 'react'
import { DefaultPageQuery } from '../GraphQL/DefaultPage.gql'
import { Footer } from './Footer'
import Logo from './Logo'

export type LayoutMinimalProps = Omit<DefaultPageQuery, 'pages'> &
  Omit<FullPageShellBaseProps, 'header' | 'footer'>

export function LayoutMinimal(props: LayoutMinimalProps) {
  const { footer, menu, children, ...uiProps } = props

  return (
    <FullPageShellBase {...uiProps} header={<Logo />} footer={<Footer footer={footer} />}>
      {children}
    </FullPageShellBase>
  )
}
