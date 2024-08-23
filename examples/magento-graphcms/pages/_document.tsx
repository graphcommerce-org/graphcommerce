import { LinguiDocumentProps, withLingui } from '@graphcommerce/lingui-next/server'
import {
  DocumentBodyEnd,
  DocumentBodyStart,
  DocumentHeadEnd,
  DocumentHeadStart,
  EmotionCacheProps,
  getCssFlagsInitScript,
  normalizeLocale,
  withEmotionCache,
} from '@graphcommerce/next-ui/server'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

class Document extends NextDocument<EmotionCacheProps & LinguiDocumentProps> {
  render() {
    return (
      <Html lang={normalizeLocale(this.props.locale)}>
        <Head>
          <DocumentHeadStart key='head-start' {...this.props} />
          {getCssFlagsInitScript()}
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          <meta name='emotion-insertion-point' content='' />
          {this.props.emotionStyleTags}
          {this.props.linguiScriptTag}
          <DocumentHeadEnd key='head-end' {...this.props} />
        </Head>
        <body>
          <DocumentBodyStart key='body-start' {...this.props} />
          <InitColorSchemeScript attribute='class' />
          <Main />
          <NextScript />
          <DocumentBodyEnd key='body-start' {...this.props} />
        </body>
      </Html>
    )
  }
}

export default withEmotionCache(withLingui(Document, (locale) => import(`../locales/${locale}.po`)))
