import { Breakpoint, Theme, useMediaQuery } from '@mui/material'
import dynamic from 'next/dynamic'
import { OverlayPanelProps } from './OverlayPanel'
import { PopperPanelProps } from './PopperPanel'

const OverlayPanel = dynamic(async () => (await import('./OverlayPanel')).OverlayPanel)

const PopperPanel = dynamic(async () => (await import('./PopperPanel')).PopperPanel)

export type OverlayOrPopperPanelProps = {
  breakpoint?: Breakpoint | false
} & PopperPanelProps &
  OverlayPanelProps

export function OverlayOrPopperPanel(panel: OverlayOrPopperPanelProps) {
  const { breakpoint = 'md', ...panelProps } = panel

  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up(breakpoint || 'md'))
  const isPopper = isDesktop && breakpoint
  return <>{isPopper ? <PopperPanel {...panelProps} /> : <OverlayPanel {...panelProps} />}</>
}
