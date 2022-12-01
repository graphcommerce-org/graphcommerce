import { ChipProps } from '@mui/material'
import { PropsWithChildren } from 'react'
import { OverlayProps } from '../Overlay/components/OverlaySsr'

export type FilterPanelProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component' | 'onClick' | 'onReset'>
> &
  Pick<OverlayProps, 'active' | 'onClosed'> & {
    onReset?: () => void
    onApply?: () => void
    maxLength?: number
    closeOnAction?: boolean
  }
