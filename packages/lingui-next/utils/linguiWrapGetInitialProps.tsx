import { i18n, Messages } from '@lingui/core'
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

    if (!locale) throw Error('No locales specified')
    try {
      const messages = (await load(locale)).messages as Messages

      i18n.load(locale, messages)
      i18n.activate(locale)

      return {
        ...initial,
        head: [
          ...(React.Children.toArray(initial.head) as Array<JSX.Element | null>),
          <script
            type='application/json'
            id='lingui'
            lang={locale}
            dangerouslySetInnerHTML={{ __html: JSON.stringify(messages) }}
          ></script>,
        ],
      }
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.error(e)
      return initial
    }
  }
}
