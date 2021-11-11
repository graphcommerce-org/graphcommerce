import { GoogleTagManagerNoScript } from '@graphcommerce/googletagmanager'
import { linguiWrapGetInitialProps, MessageLoader } from '@graphcommerce/lingui-next'
import Document from '@graphcommerce/next-ui/Page/Document'
import { Head, Html, Main, NextScript } from 'next/document'

const loader: MessageLoader = (locale) => import(`../locales/${locale}.po`)

export default class ThemedDocument extends Document {
  static getInitialProps = linguiWrapGetInitialProps(Document.getInitialProps, loader)

  render() {
    return (
      <Html>
        <Head>
          {/** We're using a variable font that supports multiple modes */}
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          {/* <link
            href='https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap'
            rel='stylesheet'
          /> */}
        </Head>
        <body>
          <GoogleTagManagerNoScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
