// import { GoogleTagManagerNoScript } from '@graphcommerce/googletagmanager'
import { withLingui } from '@graphcommerce/lingui-next'
import { EmotionCacheProps, withEmotionCache } from '@graphcommerce/next-ui'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument<EmotionCacheProps> {
  render() {
    return (
      <Html>
        <Head>
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default withLingui(withEmotionCache(Document), (locale) => import(`../locales/${locale}.po`))
