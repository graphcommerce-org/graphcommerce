import {
  PageShellHeader as PageShellHeaderBase,
  PageShellHeaderProps as PageShellHeaderPropsBase,
} from '@reachdigital/next-ui'
import React from 'react'
import Logo from './Logo'

type FullPageShellHeaderProps = Omit<PageShellHeaderPropsBase, 'logo'>

export default function FullPageShellHeader(props: FullPageShellHeaderProps) {
  return <PageShellHeaderBase logo={<Logo />} fill='mobile-only' {...props} />
}
