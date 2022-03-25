import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { LayoutOverlay, LayoutOverlayProps } from '../components/LayoutOverlay'

export type LayoutOverlayState = Omit<
  LayoutOverlayProps,
  'children' | 'sx' | 'sxBackdrop' | 'mdSpacingTop' | 'smSpacingTop'
>

function useQueryState<T extends ParsedUrlQuery>(builder: (query: T) => T) {
  const { query, replace } = useRouter()
  const queryState = builder(query as T)

  const setRouterQuery = (partialQuery: T) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    replace({ query: { ...queryState, ...partialQuery } }, undefined, { shallow: true })
  }
  return [queryState, setRouterQuery] as const
}

export function useLayoutState() {
  const [routerQuery, setRouterQuery] = useQueryState<LayoutOverlayState>(
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
