import {
  PageShellHeader as PageShellHeaderBase,
  PageShellHeaderProps as PageShellHeaderPropsBase,
} from '@reachdigital/next-ui'
import React from 'react'
import Logo from './Logo'

type PageShellHeaderProps = Omit<PageShellHeaderPropsBase, 'logo'>

export default function PageShellHeader(props: PageShellHeaderProps) {
  return <PageShellHeaderBase logo={<Logo />} {...props} />
}
