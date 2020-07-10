import App from 'next/app'
import { renderLayoutPage } from 'components/LayoutPage'
import { appWithTranslation } from 'components/withi18n/i18n'

import 'components/ShopLayout/index.global.css'

class ProjectApp extends App {
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

export default appWithTranslation(ProjectApp)
