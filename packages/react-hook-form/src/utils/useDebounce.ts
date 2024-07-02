// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemoObject } from '@graphcommerce/next-ui/hooks/useMemoObject'
import useEventCallback from '@mui/utils/useEventCallback'
import type {
  DebounceSettings,
  DebounceSettingsLeading,
  DebouncedFunc,
  DebouncedFuncLeading,
} from 'lodash'
import debounce from 'lodash/debounce'
import { useMemo } from 'react'

export type { DebounceSettings, DebounceSettingsLeading, DebouncedFunc, DebouncedFuncLeading }

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since
 * the last time the debounced function was invoked. The debounced function comes with a cancel method to
 * cancel delayed invocations and a flush method to immediately invoke them. Provide an options object to
 * indicate that func should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent
 * calls to the debounced function return the result of the last func invocation.
 *
 * Note: If leading and trailing options are true, func is invoked on the trailing edge of the timeout only
 * if the the debounced function is invoked more than once during the wait timeout.
 *
 * See David Corbacho’s article for details over the differences between _.debounce and _.throttle.
 *
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @param options The options object.
 * @param options.leading Specify invoking on the leading edge of the timeout.
 * @param options.maxWait The maximum time func is allowed to be delayed before it’s invoked.
 * @param options.trailing Specify invoking on the trailing edge of the timeout.
 * @return Returns the new debounced function.
 */
export function useDebounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number | undefined,
  options: DebounceSettingsLeading,
): DebouncedFuncLeading<T>
export function useDebounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait?: number,
  options?: DebounceSettings,
): DebouncedFunc<T>
export function useDebounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait?: number,
  options?: DebounceSettings,
): DebouncedFunc<T> {
  const cb = useEventCallback(func)
  const opts = useMemoObject(options)
  return useMemo(() => debounce<T>(cb, wait, opts), [cb, opts, wait])
}

export { debounce }
