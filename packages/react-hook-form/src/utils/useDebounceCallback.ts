import useEventCallback from '@mui/utils/useEventCallback'
import { useMemo } from 'react'
import type { DebounceOptions } from './debounce'
import debounce from './debounce'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedCallback<T extends (...args: any[]) => unknown>(
  callback: T,
  { initialWait, maxWait, wait }: DebounceOptions = {},
): T {
  const func = useEventCallback(callback)

  const debounced = useEventCallback(
    useMemo(
      () => debounce({ func, initialWait, maxWait, wait }),
      [func, initialWait, maxWait, wait],
    ),
  )

  return debounced
}
