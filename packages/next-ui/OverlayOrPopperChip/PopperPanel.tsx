import type { PopperProps } from '@mui/material'
import { ClickAwayListener, Popper } from '@mui/material'
import { useRef } from 'react'
import { sxx } from '../utils/sxx'
import { PopperPanelActions } from './PopperPanelActions'
import type { PanelProps } from './types'
import { useHandleClickNotDrag } from './useHandleClickNotDrag'

export type PopperPanelProps = PanelProps & {
  popperProps?: Omit<PopperProps, 'open' | 'anchorEl' | 'children'>
}

export function PopperPanel(props: PopperPanelProps) {
  const { activeEl, children, popperProps, ...actionsProps } = props
  const ref = useRef<HTMLDivElement>(null)
  const movement = useHandleClickNotDrag(ref)
  const handleClickAway = () => {
    if (movement.get() === 'drag') return
    actionsProps.onClose()
  }

  if (!activeEl) return null

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Popper
        {...popperProps}
        ref={ref}
        open={Boolean(activeEl)}
        anchorEl={activeEl}
        sx={sxx(
          {
            boxShadow: 12,
            borderRadius: 3,
            overflow: 'hidden',
            zIndex: 1,
            bgcolor: 'background.paper',
            display: 'grid',
            gridTemplateRows: 'min-content auto min-content',
            minWidth: 350,
            overflowY: 'auto',
            maxHeight: '500px',
          },
          popperProps?.sx,
        )}
        disablePortal
        modifiers={[
          { name: 'offset', options: { offset: [0, 10] } },
          { name: 'flip', enabled: true, options: { altBoundary: true, rootBoundary: 'viewport' } },
          { name: 'preventOverflow', enabled: true, options: { altBoundary: false, padding: 10 } },
        ]}
      >
        {() => <PopperPanelActions {...actionsProps}>{children()}</PopperPanelActions>}
      </Popper>
    </ClickAwayListener>
  )
}
