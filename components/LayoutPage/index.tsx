import React from 'react'
import { NextPage, NextComponentType, NextPageContext } from 'next'
import { PageTransitionPair } from 'components/FramerMotion'

function isLayoutPage<P = Record<string, unknown>, IP = P>(
  Component: NextPage<P, IP> | LayoutPage<P, IP>,
): Component is LayoutPage<P, IP> {
  return (Component as LayoutPage<P, IP>).layout !== undefined
}

export type LayoutPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  layout: React.FC<IP & { pageTransition?: PageTransitionPair }>
  pageTransition?: PageTransitionPair
}

export function renderLayoutPage(
  Component: NextComponentType<NextPageContext>,
  pageProps: Record<string, unknown>,
): JSX.Element {
  if (isLayoutPage(Component)) {
    const LayoutComponent = Component.layout
    return (
      <LayoutComponent {...pageProps} pageTransition={Component.pageTransition}>
        <Component {...pageProps} />
      </LayoutComponent>
    )
  }
  return <Component {...pageProps} />
}
