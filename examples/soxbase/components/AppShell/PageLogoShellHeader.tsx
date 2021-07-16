import React from 'react'
import { PageShellHeader, PageShellHeaderProps } from '../../../../packages/next-ui'
import Logo from './Logo'

export default function PageLogoShellHeader(props: PageShellHeaderProps) {
  return <PageShellHeader logo={<Logo />} {...props} />
}
