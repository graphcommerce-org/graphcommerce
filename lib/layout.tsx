import React from 'react'
import { NextPage, NextComponentType, NextPageContext } from 'next'

function isLayoutPage<P = {}, IP = P>(Component: any): Component is LayoutPage<P, IP> {
  return Component.layout !== undefined
}

export type LayoutPage<P = {}, IP = P> = NextPage<P, IP> & {
  layout: NextPage<P, IP>
}

export function renderLayout(
  Component: NextComponentType<NextPageContext, any, {}>,
  pageProps: any,
) {
  if (isLayoutPage<{}, any>(Component)) {
    const LayoutComponent = Component.layout
    return (
      <LayoutComponent {...pageProps}>
        <Component {...pageProps} />
      </LayoutComponent>
    )
  }
  return <Component {...pageProps} />
}
