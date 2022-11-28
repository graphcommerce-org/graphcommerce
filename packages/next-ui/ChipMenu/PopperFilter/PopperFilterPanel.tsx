import { ChipProps, ClickAwayListener, Popper } from '@mui/material'
import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import { PopperFilterContent } from './PopperFilterContent'
import { useMouseEvents } from './helpers/useMouseEvents'

type PopperFilterPanelProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component' | 'onClick'>
> & {
  openEl: null | HTMLElement
  onClose?: () => void
  onApply?: () => void
  onReset?:
    | (React.MouseEventHandler<HTMLButtonElement> &
        React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLSpanElement>)
    | undefined
}

export function PopperFilterPanel(props: PopperFilterPanelProps) {
  const { openEl, onClose, onApply } = props
  const open = Boolean(openEl)

  const ref = useRef(null)
  const { movement } = useMouseEvents(ref)

  if (!open) return null
  return (
    <ClickAwayListener
      mouseEvent='onClick'
      onClickAway={() => {
        if (onClose && openEl && movement !== 'drag') onClose()
        if (onApply && movement !== 'drag') onApply()
      }}
    >
      <Popper
        open={open}
        anchorEl={openEl}
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
        <PopperFilterContent
          {...props}
          ref={ref}
          onClosed={() => {
            if (onClose && openEl) onClose()
          }}
        />
      </Popper>
    </ClickAwayListener>
  )
}
