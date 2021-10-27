import {
  PageShellHeader as PageShellHeaderBase,
  PageShellHeaderProps as PageShellHeaderPropsBase,
} from '@graphcommerce/next-ui'
import React from 'react'
import Logo from './Logo'

type FullPageShellHeaderProps = Omit<PageShellHeaderPropsBase, 'logo'>

export default function FullPageShellHeader(props: FullPageShellHeaderProps) {
  const { backFallbackHref = '/', backFallbackTitle = 'Home' } = props
  return (
    <PageShellHeaderBase
      logo={<Logo />}
      fill='mobile-only'
      {...props}
      backFallbackHref={backFallbackHref}
      backFallbackTitle={backFallbackTitle}
    />
  )
}
