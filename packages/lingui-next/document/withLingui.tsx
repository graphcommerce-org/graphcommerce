import { normalizeLocale } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
// eslint-disable-next-line @next/next/no-document-import-in-page
import { DocumentContext, DocumentInitialProps } from 'next/document'
// eslint-disable-next-line @next/next/no-document-import-in-page
import type NextDocument from 'next/document'
import React from 'react'
import { MessageLoader } from '../types'

export type LinguiDocumentProps = { linguiScriptTag: React.ReactNode }

export function withLingui(
  Document: typeof NextDocument,
  load: MessageLoader,
): typeof NextDocument {
  return class DocumentWithEmotionCache extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const initial = await Document.getInitialProps(ctx)

      const locale = normalizeLocale(ctx.locale)

      if (!locale) return initial
      try {
        const { messages } = await load(locale)

        i18n.load(locale, messages)
        i18n.activate(locale)

        const props: DocumentInitialProps & LinguiDocumentProps = {
          ...initial,
          linguiScriptTag: (
            <script
              key='lingui'
              type='application/json'
              id='lingui'
              lang={locale}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: JSON.stringify(messages) }}
            />
          ),
        }
        return props
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.error(e)
        return initial
      }
    }
  }
}
