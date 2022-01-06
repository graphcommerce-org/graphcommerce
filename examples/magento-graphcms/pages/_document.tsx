// import { GoogleTagManagerNoScript } from '@graphcommerce/googletagmanager'
import { linguiWrapGetInitialProps, MessageLoader } from '@graphcommerce/lingui-next'
import { documentWithEmotion } from '@graphcommerce/next-ui/Styles/documentWithEmotion'
import Document from 'next/document'

const loader: MessageLoader = (locale) => import(`../locales/${locale}.po`)

class ThemedDocument extends Document {
  static getInitialProps = linguiWrapGetInitialProps(Document.getInitialProps, loader)
}

export default documentWithEmotion(ThemedDocument)
