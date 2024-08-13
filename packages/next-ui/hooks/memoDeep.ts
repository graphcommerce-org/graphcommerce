// eslint-disable-next-line import/no-extraneous-dependencies
import { equal } from '@wry/equality'
import { FunctionComponent, memo, NamedExoticComponent } from 'react'

/**
 * This is a deep comparison version of React's `memo` function.
 *
 * This method isn't too expensive to run, but will be rerun every time a parent component is rendered.
 *
 * This should probably only be used as the result of a performance profiling session.
 */
export function memoDeep<P extends object>(
  Component: FunctionComponent<P>,
  measure: boolean = false,
): NamedExoticComponent<P> {
  return memo(
    Component,
    process.env.NODE_ENV === 'development' && measure
      ? (prevProps, nextProps) => {
          const start = performance.now()
          const result = equal(prevProps, nextProps)
          const ms = performance.now() - start

          if (ms < 0.2) return result

          console.log(`memoDeep took more than 0.2ms`, {
            result,
            ms,
            Component,
            prevProps,
            nextProps,
          })

          return result
        }
      : equal,
  )
}
