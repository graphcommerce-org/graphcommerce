import { useUrlQuery } from '../../hooks/useUrlQuery'
import type { LayoutOverlayProps } from '../components/LayoutOverlay'
import { LayoutOverlay } from '../components/LayoutOverlay'

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
>

export function useLayoutState() {
  const [routerQuery, setRouterQuery] = useUrlQuery<LayoutOverlayState>()

  return [routerQuery, setRouterQuery] as const
}

export function LayoutOverlayDemo({ children }: { children?: React.ReactNode }) {
  const [layout] = useLayoutState()

  return <LayoutOverlay {...layout}>{children}</LayoutOverlay>
}
