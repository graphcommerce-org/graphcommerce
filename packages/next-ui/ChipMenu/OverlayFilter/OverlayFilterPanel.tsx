import { ChipProps } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { Overlay } from '../../Overlay/components/Overlay'
import { OverlayProps } from '../../Overlay/components/OverlaySsr'
import { OverlayFilterContent } from './OverlayFilterContent'

type OverlayFilterPanelProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component' | 'onClick'>
> &
  Pick<OverlayProps, 'active' | 'onClosed'> & {
    onReset?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement>
  }

export function OverlayFilterPanel(props: OverlayFilterPanelProps) {
  const { active, onClosed } = props

  return (
    <Overlay onClosed={onClosed} active={active} variantSm='bottom' sizeSm='minimal'>
      <OverlayFilterContent {...props} />
    </Overlay>
  )
}
