import { useViewportScroll } from 'framer-motion'
import React from 'react'
import AppShellHeader from '../AppShellHeader'
import { FullPageShellHeaderProps } from '../FullPageShellHeader'

export default function MinimalPageShellHeader(props: FullPageShellHeaderProps) {
  const { scrollY } = useViewportScroll()
  return <AppShellHeader {...props} scrollY={scrollY} hideClose />
}
