import { RouterContext } from 'next/dist/shared/lib/router-context'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import React from 'react'
import { pageRouterContext } from '../context/pageRouterContext'
import { PageItem } from '../types'

// eslint-disable-next-line react/jsx-no-useless-fragment
const NoLayout: React.FC = ({ children }) => <>{children}</>

export type PageRendererProps = Omit<AppPropsType, 'router'> & {
  Layout: React.ComponentType<AppPropsType>
  layoutProps: AppPropsType
}

export const PageRenderer = React.memo((props: PageItem) => {
  const { PageComponent, routerContext, Layout = NoLayout, layoutProps, actualPageProps } = props
  return (
    <RouterContext.Provider value={routerContext.currentRouter}>
      <pageRouterContext.Provider value={routerContext}>
        <Layout {...layoutProps}>
          <PageComponent {...actualPageProps} />
        </Layout>
      </pageRouterContext.Provider>
    </RouterContext.Provider>
  )
})
PageRenderer.displayName = 'PageRenderer'
