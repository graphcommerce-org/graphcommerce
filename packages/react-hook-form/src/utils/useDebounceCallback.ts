// eslint-disable-next-line import/no-extraneous-dependencies
import useEventCallback from '@mui/utils/useEventCallback'
import { useEffect, useRef } from 'react'
import debounce, { DebounceOptions } from './debounce'

export function useDebouncedCallback<T extends (...args: any[]) => unknown>(
  callback: T,
  { initialWait, maxWait, wait }: DebounceOptions = {},
): T {
  const func = useEventCallback(callback)

  const debounced = useRef(debounce({ func, initialWait, maxWait, wait }))

  // Re-create the debounced function if the dependencies change
  useEffect(() => {
    debounced.current = debounce({ func, initialWait, maxWait, wait })
    return () => debounced.current.clear()
  }, [func, initialWait, maxWait, wait])

  return debounced.current
}
