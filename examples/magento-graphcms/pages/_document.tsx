// import { GoogleTagManagerNoScript } from '@graphcommerce/googletagmanager'
import { linguiWrapGetInitialProps, MessageLoader } from '@graphcommerce/lingui-next'
import { withEmotion } from '@graphcommerce/next-ui'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const loader: MessageLoader = (locale) => import(`../locales/${locale}.po`)

class ThemedDocument extends Document {
  static getInitialProps = linguiWrapGetInitialProps(Document.getInitialProps, loader)

  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* <GoogleTagManagerNoScript /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default withEmotion(ThemedDocument)
