import React, { PropsWithChildren } from 'react'
import { OverlayProps } from '../Overlay/components/OverlaySsr'

export type PanelProps = PropsWithChildren<
  Pick<OverlayProps, 'active'> & {
    label?: React.ReactNode
    onReset?: () => void
    onApply?: () => void
    onClose?: () => void
    maxLength?: number
    closeOnAction?: boolean
    mode?: 'popper' | 'overlay' | 'responsive'
    activeEl?: HTMLElement | null
  }
>
