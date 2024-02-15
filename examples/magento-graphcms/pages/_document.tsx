import { normalizeLocale } from '@graphcommerce/lingui-next'
import { withLingui } from '@graphcommerce/lingui-next/document/withLingui'
import type { LinguiDocumentProps } from '@graphcommerce/lingui-next/document/withLingui'
import { EmotionCacheProps, getFlagsInitScript, withEmotionCache } from '@graphcommerce/next-ui'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class Document extends NextDocument<EmotionCacheProps & LinguiDocumentProps> {
  render() {
    return (
      <Html lang={normalizeLocale(this.props.locale)}>
        <Head>
          {getFlagsInitScript()}
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
