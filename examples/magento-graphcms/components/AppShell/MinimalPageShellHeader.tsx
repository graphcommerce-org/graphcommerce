import {
  MinimalPageShellHeader as MinimalPageShellHeaderBase,
  FullPageShellHeaderProps as PageShellHeaderPropsBase,
} from '@graphcommerce/next-ui'
import React from 'react'
import Logo from './Logo'

type PageShellHeaderProps = Omit<PageShellHeaderPropsBase, 'logo'>

export default function MinimalPageShellHeader(props: PageShellHeaderProps) {
  return <MinimalPageShellHeaderBase logo={<Logo />} {...props} />
}
