import type { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import createEmotionServer from '@emotion/server/create-instance'
// eslint-disable-next-line @next/next/no-document-import-in-page
import { AppType } from 'next/app'
import type NextDocument from 'next/document'
// eslint-disable-next-line @next/next/no-document-import-in-page
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import { EmotionProviderProps } from './EmotionProvider'
import { createEmotionCache } from './createEmotionCache'

export type EmotionCacheProps = { emotionStyleTags: EmotionJSX.Element[] }

export function withEmotionCache(Document: typeof NextDocument): typeof NextDocument {
  return class DocumentWithEmotionCache extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const cache = createEmotionCache()
      const emotionServer = createEmotionServer(cache)

      const originalRenderPage = ctx.renderPage
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp:
            (App: React.ComponentType<React.ComponentProps<AppType> & EmotionProviderProps>) =>
            (props) => <App emotionCache={cache} {...props} />,
        })

      const initialProps = await Document.getInitialProps(ctx)
      // This is important. It prevents Emotion to render invalid HTML.
      // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
      const emotionStyles = emotionServer.extractCriticalToChunks(initialProps.html)
      const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      ))

      return {
        ...initialProps,
        emotionStyleTags,
      }
    }
  }
}
