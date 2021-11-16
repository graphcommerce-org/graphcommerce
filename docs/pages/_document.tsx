import Document from '@graphcommerce/next-ui/Page/Document'
import { Head, Html, Main, NextScript } from 'next/document'

export default class ThemedDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
