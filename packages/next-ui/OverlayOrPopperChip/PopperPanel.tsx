import { ClickAwayListener, Popper } from '@mui/material'
import { useRef } from 'react'
import { PopperPanelActions } from './PopperPanelActions'
import { PanelProps } from './types'
import { useMouseEvents } from './useMouseEvents'

type PopperPanelProps = PanelProps

export function PopperPanel(props: PopperPanelProps) {
  const { activeEl, onClose, onApply, closeOnAction, ...filterContentProps } = props
  const active = Boolean(activeEl)
  const ref = useRef(null)
  const { movement } = useMouseEvents(ref)

  const handleClickAway = () => {
    if (onClose && active && movement !== 'drag') onClose()
    if (onApply && movement !== 'drag') onApply()
  }

  if (!active) return null
  return (
    <ClickAwayListener mouseEvent='onClick' onClickAway={handleClickAway}>
      <Popper
        ref={ref}
        open={active}
        anchorEl={activeEl}
        sx={(theme) => ({
          boxShadow: 12,
          borderRadius: theme.shape.borderRadius,
          overflow: 'hidden',
          zIndex: 1,
          bgcolor: 'background.paper',
        })}
        keepMounted
        disablePortal
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
        <PopperPanelActions {...filterContentProps} onClose={onClose} onApply={onApply} />
      </Popper>
    </ClickAwayListener>
  )
}
