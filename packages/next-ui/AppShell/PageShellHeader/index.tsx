import { useViewportScroll } from 'framer-motion'
import React from 'react'
import AppShellHeader, { AppShellHeaderProps } from '../AppShellHeader'

export type PageShellHeaderProps = Omit<
  AppShellHeaderProps,
  'scrollY' | 'hideClose' | 'dragIndicator'
>

export default function PageShellHeader(props: PageShellHeaderProps) {
  const { scrollY } = useViewportScroll()

  return <AppShellHeader {...props} scrollY={scrollY} hideClose />
}
