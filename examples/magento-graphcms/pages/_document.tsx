// import { GoogleTagManagerNoScript } from '@graphcommerce/googletagmanager'
import { linguiWrapGetInitialProps, MessageLoader } from '@graphcommerce/lingui-next'
import Document from '@graphcommerce/next-ui/Page/Document'
import { Head, Html, Main, NextScript } from 'next/document'

const loader: MessageLoader = (locale) => import(`../locales/${locale}.po`)

export default class ThemedDocument extends Document {
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
