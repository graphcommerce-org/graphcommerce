import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { NextRouter, useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { pageRouterContext } from '../context/pageRouterContext'
import { PageItem } from '../types'

const NoLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>

export type PageRendererProps = Omit<AppPropsType, 'router'> & {
  Layout: React.ComponentType<AppPropsType>
  layoutProps: AppPropsType
}

const PageRendererLayout = React.memo((props: PageItem) => {
  const { PageComponent, layoutProps, pageProps, routerContext } = props

  const Layout = PageComponent.pageOptions?.Layout ?? NoLayout

  return (
    <pageRouterContext.Provider value={routerContext}>
      <Layout {...layoutProps}>
        <PageComponent {...pageProps} />
      </Layout>
    </pageRouterContext.Provider>
  )
})

export function PageRenderer(props: PageItem) {
  const { routerContext } = props
  const router = useRouter()

  const { asPath, pathname, locale, query } = routerContext.pageInfo

  const pageRouter = useMemo(() => {
    const overrideProps = { asPath, pathname, locale, query }
    return new Proxy<NextRouter>(router, {
      get: (target, prop: string, receiver) =>
        overrideProps[prop] ?? Reflect.get(target, prop, receiver),
    })

    // We don't want to re-render when the router changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath, locale, pathname, query])

  return (
    <RouterContext.Provider value={pageRouter}>
      <PageRendererLayout {...props} />
    </RouterContext.Provider>
  )
}
