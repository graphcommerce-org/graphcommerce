import { i18n } from '@lingui/core'
// eslint-disable-next-line @next/next/no-document-import-in-page
import { DocumentContext } from 'next/document'
// eslint-disable-next-line @next/next/no-document-import-in-page
import type NextDocument from 'next/document'
import React from 'react'
import { MessageLoader } from '../types'

export function withLingui(
  Document: typeof NextDocument,
  load: MessageLoader,
): typeof NextDocument {
  return class DocumentWithEmotionCache extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const initial = await Document.getInitialProps(ctx)

      const locale = ctx.locale?.split('-')?.[0]

      if (!locale) return initial
      try {
        const { messages } = await load(locale)

        i18n.load(locale, messages)
        i18n.activate(locale)

        return {
          ...initial,
          head: [
            ...(React.Children.toArray(initial.head) as Array<JSX.Element | null>),
            <script
              key='lingui'
              type='application/json'
              id='lingui'
              lang={locale}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: JSON.stringify(messages) }}
            />,
          ],
        }
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.error(e)
        return initial
      }
    }
  }
}
