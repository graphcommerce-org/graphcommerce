import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { LayoutPage, isLayoutPage } from 'components/LayoutPage'
import PageTransition, { TransitionPage } from 'components/PageTransition'

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: LayoutPage & TransitionPage }) {
  useEffect(() => {
    const styles = document.getElementById('jss-server-side')
    if (styles) styles.remove()
  })

  const children = (
    <PageTransition pageTransition={Component.pageTransition}>
      <Component {...pageProps} />
    </PageTransition>
  )

  if (isLayoutPage(Component)) {
    return <Component.Layout {...pageProps}>{children}</Component.Layout>
  }

  return children
}
