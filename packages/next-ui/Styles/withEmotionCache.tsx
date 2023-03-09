import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import createEmotionServer from '@emotion/server/create-instance'
// eslint-disable-next-line @next/next/no-document-import-in-page
import type NextDocument from 'next/document'
// eslint-disable-next-line @next/next/no-document-import-in-page
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import { createMuiCache } from './EmotionProvider'

export type EmotionCacheProps = { emotionStyleTags: EmotionJSX.Element[] }

export function withEmotionCache(Document: typeof NextDocument): typeof NextDocument {
  return class DocumentWithEmotionCache extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const emotionServer = createEmotionServer(createMuiCache())
      const initialProps = await Document.getInitialProps(ctx)

      const emotionStyleTags = emotionServer
        .extractCriticalToChunks(initialProps.html)
        .styles.filter(({ css }) => css !== '')
        .map((style) => (
          <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
          />
        ))

      const props: DocumentInitialProps & EmotionCacheProps = {
        ...initialProps,
        emotionStyleTags,
      }
      return props
    }
  }
}
