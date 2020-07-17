import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { LayoutPage, assertLayoutPage } from 'components/LayoutPage'
import PageTransition, { TransitionPage } from 'components/PageTransition'

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: LayoutPage & TransitionPage }) {
  useEffect(() => {
    const styles = document.getElementById('jss-server-side')
    if (styles) styles.remove()
  })

  // Since we can't actually force a page to honor the LayoutPage contract we runtime check here.
  assertLayoutPage(Component)

  return (
    <Component.Layout {...pageProps}>
      <PageTransition pageTransition={Component.pageTransition}>
        <Component {...pageProps} />
      </PageTransition>
    </Component.Layout>
  )
}
