import useEventCallback from '@mui/utils/useEventCallback'
import { useEffect, useRef } from 'react'
import debounce, { DebounceOptions } from './debounce'

export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  { initialWait, maxWait, wait }: DebounceOptions = {},
): T {
  const func = useEventCallback(callback) as T

  const debounced = useRef(debounce({ func, initialWait, maxWait, wait }))

  // Re-create the debounced function if the dependencies change
  useEffect(() => {
    debounced.current = debounce({ func, initialWait, maxWait, wait })
    return () => debounced.current.clear()
  }, [func, initialWait, maxWait, wait])

  return debounced.current
}
