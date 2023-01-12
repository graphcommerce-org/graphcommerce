import { Theme, useMediaQuery } from '@mui/material'
import dynamic from 'next/dynamic'
import { useCallback } from 'react'
import { PanelProps } from '../types'

const OverlayPanel = dynamic(async () => (await import('./OverlayPanel/OverlayPanel')).OverlayPanel)

const PopperPanel = dynamic(async () => (await import('./PopperPanel/PopperPanel')).PopperPanel)

export function DynamicPanel(panel: PanelProps) {
  const { children, onClose, mode = 'responsive', active, activeEl, ...panelProps } = panel

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const panelMode = useCallback(() => {
    if (mode === 'responsive') {
      if (isMobile) return 'overlay'
      if (!isMobile) return 'popper'
    }
    return mode
  }, [isMobile, mode])

  return (
    <>
      {panelMode() === 'overlay' && (
        <OverlayPanel {...panelProps} active={active} onClosed={() => onClose?.()}>
          {children}
        </OverlayPanel>
      )}
      {panelMode() === 'popper' && (
        <PopperPanel {...panelProps} activeEl={activeEl ?? null} active={active} onClose={onClose}>
          {children}
        </PopperPanel>
      )}
    </>
  )
}
