// eslint-disable-next-line @next/next/no-document-import-in-page
import NextDocument, { DocumentContext, DocumentInitialProps } from 'next/document'
import React from 'react'

export default class Document extends NextDocument {
  static getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })

    const initialProps = await NextDocument.getInitialProps(ctx)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }
}
