import App from 'next/app'
import { renderLayoutPage } from 'components/LayoutPage'

export default class extends App {
  componentDidMount(): void {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props
    return renderLayoutPage(Component, pageProps)
  }
}
