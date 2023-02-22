import { Breakpoint } from '@mui/material'
import dynamic from 'next/dynamic'
import { startTransition, useEffect, useState } from 'react'
import { useMatchMedia } from '../hooks'
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

  const matchMedia = useMatchMedia()
  const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined)
  useEffect(
    () => startTransition(() => setIsDesktop(matchMedia.up(breakpoint || 'md'))),
    [breakpoint, matchMedia],
  )

  if (isDesktop === undefined) return null

  const isPopper = isDesktop && breakpoint
  return <>{isPopper ? <PopperPanel {...panelProps} /> : <OverlayPanel {...panelProps} />}</>
}
