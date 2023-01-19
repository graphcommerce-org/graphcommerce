import { Overlay } from '../Overlay/components/Overlay'
import { OverlayProps } from '../Overlay/components/OverlaySsr'
import { OverlayPanelActions } from './OverlayPanelActions'
import { PanelProps } from './types'

export type OverlayPanelProps = PanelProps & {
  overlayProps?: Omit<OverlayProps, 'active' | 'onClosed' | 'children'>
}

export function OverlayPanel(props: OverlayPanelProps) {
  const { activeEl, children, onClose, overlayProps, ...rest } = props

  // TODO: create max length prop to change panel behaviour
  // const castedChildren = children as ReactElement
  // const menuLength = castedChildren?.props.items?.length
  // const mode = size ?? menuLength > sizeShift ? 'full' : 'minimal'

  return (
    <Overlay {...overlayProps} onClosed={onClose} active={Boolean(activeEl)}>
      {() => (
        <OverlayPanelActions onClose={onClose} {...rest}>
          {children()}
        </OverlayPanelActions>
      )}
    </Overlay>
  )
}
