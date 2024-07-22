// eslint-disable-next-line import/no-extraneous-dependencies
import useEventCallback from '@mui/utils/useEventCallback'
import { useMemo } from 'react'
import debounce, { DebounceOptions } from './debounce'

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
