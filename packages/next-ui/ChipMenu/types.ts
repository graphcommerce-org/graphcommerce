import { ChipProps } from '@mui/material'
import { PropsWithChildren } from 'react'
import { OverlayProps } from '../Overlay/components/OverlaySsr'

export type FilterPanelProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component' | 'onClick'>
> &
  Pick<OverlayProps, 'active' | 'onClosed'> & {
    onReset?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement>
    maxLength?: number
  }
