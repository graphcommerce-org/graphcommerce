import { ClickAwayListener, Popper, PopperProps } from '@mui/material'
import { useRef } from 'react'
import { PopperPanelActions } from './PopperPanelActions'
import { PanelProps } from './types'
import { useHandleClickNotDrag } from './useHandleClickNotDrag'

export type PopperPanelProps = PanelProps & {
  popperProps?: Omit<PopperProps, 'open' | 'anchorEl' | 'children'>
}

export function PopperPanel(props: PopperPanelProps) {
  const { activeEl, children, ...actionsProps } = props
  const ref = useRef(null)
  const movement = useHandleClickNotDrag(ref)
  const handleClickAway = () => {
    if (movement.get() === 'drag') return
    actionsProps.onClose()
  }

  if (!activeEl) return null

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Popper
        ref={ref}
        open={Boolean(activeEl)}
        anchorEl={activeEl}
        sx={(theme) => ({
          boxShadow: 12,
          borderRadius: theme.shape.borderRadius,
          overflow: 'hidden',
          zIndex: 1,
          bgcolor: 'background.paper',
        })}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },

          {
            name: 'flip',
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: 'viewport',
            },
          },
          {
            name: 'preventOverflow',
            enabled: false,
            options: {
              altAxis: true,
              altBoundary: false,
              tether: false,
              rootBoundary: 'viewport',
            },
          },
        ]}
      >
        {() => <PopperPanelActions {...actionsProps}>{children()}</PopperPanelActions>}
      </Popper>
    </ClickAwayListener>
  )
}
