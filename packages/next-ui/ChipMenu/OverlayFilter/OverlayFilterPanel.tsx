import { ChipProps } from '@mui/material'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Overlay } from '../../Overlay/components/Overlay'
import { OverlayProps } from '../../Overlay/components/OverlaySsr'
import { OverlayFilterContent } from './OverlayFilterContent'

type OverlayFilterPanelProps = PropsWithChildren<
  Omit<ChipProps<'button'>, 'children' | 'component' | 'onClick'>
> &
  Pick<OverlayProps, 'active' | 'onClosed'> & {
    onReset?: () => void
    onApply?: () => void
  }

export function OverlayFilterPanel(props: OverlayFilterPanelProps) {
  const { active, onClosed, children } = props

  const maxLength = 20
  const castedChildren = children as ReactElement
  const menuLength = castedChildren?.props.items?.length
  const mode = menuLength > maxLength ? 'full' : 'minimal'

  return (
    <Overlay onClosed={onClosed} active={active} variantSm='bottom' sizeSm={mode}>
      <OverlayFilterContent {...props} maxLength={maxLength} />
    </Overlay>
  )
}
