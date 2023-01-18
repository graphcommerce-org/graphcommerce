import { ChipProps } from '@mui/material'
import React, { PropsWithChildren, ReactElement } from 'react'
import { LayoutOverlaySize } from '../Overlay'
import { Overlay } from '../Overlay/components/Overlay'
import { OverlayProps } from '../Overlay/components/OverlaySsr'
import { OverlayPanelActions } from './OverlayPanelActions'

type OverlayPanelProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component' | 'onClick'>
> &
  OverlayProps & {
    sizeShift?: number
    size?: LayoutOverlaySize
  }

export function OverlayPanel(props: OverlayPanelProps) {
  const { children, size, sizeShift = 20, ...rest } = props

  // TODO: create max length prop to change panel behaviour
  const castedChildren = children as ReactElement
  const menuLength = castedChildren?.props.items?.length
  const mode = size ?? menuLength > sizeShift ? 'full' : 'minimal'

  return (
    <Overlay {...rest} sizeSm={mode} sizeMd={mode}>
      <OverlayPanelActions {...rest} maxLength={sizeShift}>
        {children}
      </OverlayPanelActions>
    </Overlay>
  )
}
