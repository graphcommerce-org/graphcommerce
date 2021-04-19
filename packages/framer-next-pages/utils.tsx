import { NextRouter } from 'next/router'

export function scrollPos(idx: number): { x: number; y: number } {
  const scroll = global.window?.sessionStorage[`__next_scroll_${idx}`]
  return scroll ? JSON.parse(scroll) : { x: 0, y: 0 }
}

export function createRouterProxy(router: NextRouter): NextRouter {
  const { asPath, pathname, query, locale } = router

  // We create an object with the current stale properties
  const routerProps = { asPath, pathname, query, locale }

  return new Proxy(router, {
    get: (target, prop: string, receiver) =>
      routerProps[prop] ?? Reflect.get(target, prop, receiver),
  })
}
