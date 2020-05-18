import React from 'react'
import { NextPage, NextComponentType, NextPageContext } from 'next'

function isLayoutPage<P = {}, IP = P>(
  Component: NextPage<P, IP> | LayoutPage<P, IP>,
): Component is LayoutPage<P, IP> {
  return (Component as LayoutPage<P, IP>).layout !== undefined
}

export type LayoutPage<P = {}, IP = P> = NextPage<P, IP> & {
  layout: React.FC<IP>
}

export function renderLayoutPage(
  Component: NextComponentType<NextPageContext, unknown, {}>,
  pageProps: {},
) {
  if (isLayoutPage<{}, unknown>(Component)) {
    const LayoutComponent = Component.layout
    return (
      <LayoutComponent {...pageProps}>
        <Component {...pageProps} />
      </LayoutComponent>
    )
  }
  return <Component {...pageProps} />
}
