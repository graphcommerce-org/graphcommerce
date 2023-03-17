import { Overlay } from '../Overlay/components/Overlay'
import { OverlayProps } from '../Overlay/components/OverlaySsr'
import { OverlayPanelActions } from './OverlayPanelActions'
import { PanelProps } from './types'

export type OverlayPanelProps = PanelProps & {
  overlayProps?: Omit<OverlayProps, 'active' | 'onClosed' | 'children'>
}

export function OverlayPanel(props: OverlayPanelProps) {
  const { activeEl, children, onClose, overlayProps, ...rest } = props

  return (
    <Overlay
      {...overlayProps}
      onClosed={onClose}
      active={Boolean(activeEl)}
      sx={{
        '& .LayoutOverlayBase-overlayPane': {
          display: 'grid',
          gridTemplateRows: 'min-content auto min-content',
        },
      }}
    >
      {() => (
        <OverlayPanelActions onClose={onClose} {...rest}>
          {children()}
        </OverlayPanelActions>
      )}
    </Overlay>
  )
}
