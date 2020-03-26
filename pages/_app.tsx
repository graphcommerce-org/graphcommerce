import App from 'next/app'
import { renderLayout } from '../lib/layout'

export default class extends App {
  render() {
    const { Component, pageProps } = this.props
    return renderLayout(Component, pageProps)
  }
}
