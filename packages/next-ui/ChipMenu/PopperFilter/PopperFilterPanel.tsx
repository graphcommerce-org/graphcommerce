import { ChipProps, ClickAwayListener, Popper } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { PopperFilterContent } from './PopperFilterContent'

type PopperFilterPanelProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component' | 'onClick'>
> & {
  openEl: null | HTMLElement
  onClose?: () => void
  onReset?:
    | (React.MouseEventHandler<HTMLButtonElement> &
        React.MouseEventHandler<HTMLAnchorElement> &
        React.MouseEventHandler<HTMLSpanElement>)
    | undefined
}

export function PopperFilterPanel(props: PopperFilterPanelProps) {
  const { openEl, onClose } = props
  const open = Boolean(openEl)

  if (!open) return null
  return (
    <ClickAwayListener
      mouseEvent='onClick'
      onClickAway={() => {
        if (onClose && openEl) onClose()
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
        <PopperFilterContent {...props} />
      </Popper>
    </ClickAwayListener>
  )
}
