import { NextRouter } from 'next/router'
import { createContext } from 'react'
import { PageRouterContext, RouterProxy } from '../types'

export const pageRouterContext = createContext(undefined as unknown as PageRouterContext)
pageRouterContext.displayName = 'PageRouterContext'

type OverrideProps = Partial<Pick<NextRouter, 'asPath' | 'pathname' | 'query' | 'locale'>>

export function createRouterProxy(router: NextRouter, override?: OverrideProps): RouterProxy {
  function go(delta: number) {
    if (delta >= 0) {
      console.error(`Called .go(${delta}), only negative numbers are allowed. Redirecting to home`)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('/', '/')
      return
    }

    const deltaAbs = Math.abs(delta)
    for (let i = 0; i < deltaAbs; i++) {
      router.back()
    }
  }

  // We create an object with the current stale properties
  const overrideProps = {
    asPath: router.asPath,
    pathname: router.pathname,
    query: router.query,
    locale: router.locale,
    go,
    ...override,
  }

  return new Proxy<RouterProxy>(router as RouterProxy, {
    get: (target, prop: string, receiver) =>
      overrideProps[prop] ?? Reflect.get(target, prop, receiver),
  })
}
