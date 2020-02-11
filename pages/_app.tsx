import React from 'react'
import App from 'next/app'
import { hasLayout, GraphCmsPage } from '../graphcms'

export default class extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    const LayoutComponent = hasLayout(Component) ? (
      Component.getLayout(((<Component {...pageProps} />) as unknown) as GraphCmsPage, pageProps)
    ) : (
      <Component {...pageProps} />
    )

    return LayoutComponent
  }
}
