// eslint-disable-next-line import/no-extraneous-dependencies
import { diff } from '@graphcommerce/react-hook-form'
// eslint-disable-next-line import/no-extraneous-dependencies
import { equal } from '@wry/equality'
import type { FunctionComponent, NamedExoticComponent } from 'react'
import { memo } from 'react'

/**
 * This is a deep comparison version of React's `memo` function.
 *
 * This method isn't too expensive to run, but will be rerun every time a parent component is
 * rendered.
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

          if (!result && ms < 0.2) return result

          console.warn(`memoDeep took ${ms.toFixed(2)}ms`, {
            result,
            Component,
            prevProps,
            nextProps,
          })

          return result
        }
      : equal,
  )
}
