import { Theme, useMediaQuery } from '@mui/material'
import dynamic from 'next/dynamic'
import { PanelProps } from '../types'

const OverlayPanel = dynamic(async () => (await import('./OverlayPanel/OverlayPanel')).OverlayPanel)

const PopperPanel = dynamic(async () => (await import('./PopperPanel/PopperPanel')).PopperPanel)

/**
 * Todo: Implement a render function that will only trigger the render after the first activation
 * and keep the rendered result after that.
 *
 * Todo: Provide a breakpoint prop to allow the user to define the breakpoint
 */
export function OverlayOrPopperPanel(panel: PanelProps) {
  const { children, onClose, activeEl, ...panelProps } = panel

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <>
      {isMobile ? (
        <OverlayPanel {...panelProps} active={Boolean(activeEl)} onClosed={() => onClose?.()}>
          {children}
        </OverlayPanel>
      ) : (
        <PopperPanel {...panelProps} activeEl={activeEl} onClose={onClose}>
          {children}
        </PopperPanel>
      )}
    </>
  )
}
