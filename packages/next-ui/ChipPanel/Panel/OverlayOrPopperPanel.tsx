import { Theme, useMediaQuery } from '@mui/material'
import dynamic from 'next/dynamic'
import { useCallback } from 'react'
import { PanelProps } from '../types'

const OverlayPanel = dynamic(async () => (await import('./OverlayPanel/OverlayPanel')).OverlayPanel)

const PopperPanel = dynamic(async () => (await import('./PopperPanel/PopperPanel')).PopperPanel)

export function OverlayOrPopperPanel(panel: PanelProps) {
  const { children, onClose, mode = 'responsive', activeEl, ...panelProps } = panel

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
        <OverlayPanel {...panelProps} active={Boolean(activeEl)} onClosed={() => onClose?.()}>
          {children}
        </OverlayPanel>
      )}
      {panelMode() === 'popper' && (
        <PopperPanel {...panelProps} activeEl={activeEl} onClose={onClose}>
          {children}
        </PopperPanel>
      )}
    </>
  )
}
