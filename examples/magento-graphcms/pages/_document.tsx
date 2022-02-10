// import { GoogleTagManagerNoScript } from '@graphcommerce/googletagmanager'
import { withLingui } from '@graphcommerce/lingui-next'
import { withEmotionCache } from '@graphcommerce/next-ui'
import Document from 'next/document'

export default withLingui(withEmotionCache(Document), (locale) => import(`../locales/${locale}.po`))
