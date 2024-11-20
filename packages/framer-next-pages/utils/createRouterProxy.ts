import type { NextRouter } from 'next/router'

export type OverrideProps = Partial<Pick<NextRouter, 'asPath' | 'pathname' | 'query' | 'locale'>>

export function createRouterProxy(router: NextRouter, override?: OverrideProps): NextRouter {
  // We create an object with the current stale properties
  const { asPath, pathname, query, locale } = router

  const overrideProps: OverrideProps = { asPath, pathname, query, locale, ...override }

  return new Proxy<NextRouter>(router, {
    get: (target, prop: string, receiver) =>
      overrideProps[prop] ?? Reflect.get(target, prop, receiver),
  })
}
