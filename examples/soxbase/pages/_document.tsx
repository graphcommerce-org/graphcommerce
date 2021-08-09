import Document from '@reachdigital/next-ui/Page/Document'
import { Html, Head, Main, NextScript } from 'next/document'

export default class ThemedDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/** We're using a variable font that supports multiple modes */}
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href='https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
