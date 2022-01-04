// import { GoogleTagManagerNoScript } from '@graphcommerce/googletagmanager'
import { linguiWrapGetInitialProps, MessageLoader } from '@graphcommerce/lingui-next'
import Document from '@graphcommerce/next-ui/Page/Document'
import { Head, Html, Main, NextScript } from 'next/document'
import { withEmotionCache } from 'tss-react/nextJs'
import { createMuiCache } from './__app'

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

export default withEmotionCache({
  Document: ThemedDocument,
  getCaches: () => [createMuiCache()],
})
