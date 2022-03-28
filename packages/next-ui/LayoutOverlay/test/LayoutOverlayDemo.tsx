import { useCallback } from 'react'
import { useUrlQuery } from '../../useUrlQuery/useUrlQuery'
import { LayoutOverlay, LayoutOverlayProps } from '../components/LayoutOverlay'

export type LayoutOverlayState = Omit<
  LayoutOverlayProps,
  'children' | 'sx' | 'sxBackdrop' | 'mdSpacingTop' | 'smSpacingTop'
>

export function useLayoutState() {
  const [routerQuery, setRouterQuery] = useUrlQuery<LayoutOverlayState>(
    useCallback(
      ({ sizeMd, sizeSm, justifyMd, justifySm, variantMd, variantSm }) => ({
        sizeMd,
        sizeSm,
        justifyMd,
        justifySm,
        variantMd,
        variantSm,
      }),
      [],
    ),
  )

  return [routerQuery, setRouterQuery] as const
}

export function LayoutOverlayDemo({ children }: { children?: React.ReactNode }) {
  const [layout] = useLayoutState()

  return <LayoutOverlay {...layout}>{children}</LayoutOverlay>
}
