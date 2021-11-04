import {
  PageShellHeader as PageShellHeaderBase,
  PageShellHeaderProps as PageShellHeaderPropsBase,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import React from 'react'
import Logo from './Logo'

type FullPageShellHeaderProps = Omit<PageShellHeaderPropsBase, 'logo'>

export default function FullPageShellHeader(props: FullPageShellHeaderProps) {
  return <PageShellHeaderBase logo={<Logo />} fill='mobile-only' {...props} />
}
