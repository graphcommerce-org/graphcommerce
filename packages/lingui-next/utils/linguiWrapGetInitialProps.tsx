import { i18n } from '@lingui/core'
// eslint-disable-next-line @next/next/no-document-import-in-page
import { DocumentContext, DocumentInitialProps } from 'next/document'
import React from 'react'
import { MessageLoader } from '../types'

export function linguiWrapGetInitialProps(
  getInitialProps: (ctx: DocumentContext) => Promise<DocumentInitialProps>,
  load: MessageLoader,
): (ctx: DocumentContext) => Promise<DocumentInitialProps> {
  return async (ctx: DocumentContext) => {
    const initial = await getInitialProps(ctx)

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
