// eslint-disable-next-line import/no-extraneous-dependencies
import { equal } from '@wry/equality'
import type { DependencyList } from 'react'
import { useMemo, useRef } from 'react'

export function useMemoDeep<T>(factory: () => T, deps: DependencyList | undefined): T {
  const ref = useRef<DependencyList | undefined>(undefined)
  const signalRef = useRef<number>(0)

  if (!equal(deps, ref.current)) {
    ref.current = deps
    signalRef.current += 1
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory(), [signalRef.current])
}
