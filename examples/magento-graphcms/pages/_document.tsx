import { LinguiDocumentProps, withLingui } from '@graphcommerce/lingui-next/server'
import {
  EmotionCacheProps,
  getCssFlagsInitScript,
  normalizeLocale,
  withEmotionCache,
} from '@graphcommerce/next-ui/server'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

class Document extends NextDocument<EmotionCacheProps & LinguiDocumentProps> {
  render() {
    return (
      <Html lang={normalizeLocale(this.props.locale)}>
        <Head>
          {getCssFlagsInitScript()}
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          <meta name='emotion-insertion-point' content='' />
          {this.props.emotionStyleTags}
          {this.props.linguiScriptTag}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default withEmotionCache(withLingui(Document, (locale) => import(`../locales/${locale}.po`)))
