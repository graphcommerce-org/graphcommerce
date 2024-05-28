import { useUrlQuery } from '../../hooks/useUrlQuery'
import { LayoutOverlay, LayoutOverlayProps } from '../components/LayoutOverlay'

export type LayoutOverlayState = Omit<
  LayoutOverlayProps,
  | 'children'
  | 'sx'
  | 'sxBackdrop'
  | 'mdSpacingTop'
  | 'smSpacingTop'
  | 'overlayPaneProps'
  | 'disableInert'
  | 'widthMd'
  | 'widthSm'
  | 'blacklistedPages'
>

export function useLayoutState() {
  const [routerQuery, setRouterQuery] = useUrlQuery<LayoutOverlayState>()

  return [routerQuery, setRouterQuery] as const
}

export function LayoutOverlayDemo({ children }: { children?: React.ReactNode }) {
  const [layout] = useLayoutState()

  return <LayoutOverlay {...layout}>{children}</LayoutOverlay>
}
