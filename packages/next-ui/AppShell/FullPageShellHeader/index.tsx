import { useViewportScroll } from 'framer-motion'
import AppShellHeader, { AppShellHeaderProps } from '../AppShellHeader/index'

export type FullPageShellHeaderProps = Omit<
  AppShellHeaderProps,
  'scrollY' | 'hideClose' | 'dragIndicator'
>

export default function FullPageShellHeader(props: FullPageShellHeaderProps) {
  const { scrollY } = useViewportScroll()
  return <AppShellHeader {...props} scrollY={scrollY} hideClose floatingMd floatingSm />
}
