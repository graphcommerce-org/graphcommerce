'use client'

import type { LinguiProviderProps, SyncMessageLoader } from '@graphcommerce/lingui-next'
import { LinguiProvider } from '@graphcommerce/lingui-next'
import { normalizeLocale } from '@graphcommerce/next-ui'

type I18nProviderProps = Pick<LinguiProviderProps, 'locale' | 'children'>

const ssrLoader: SyncMessageLoader = (l: string) =>
  // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
  typeof window === 'undefined' ? require(`../../locales/${l}.po`) : { messages: [] }

/** I18n Provider for the App Router Loads translations based on the current locale */
export function I18nProvider({ locale, children }: I18nProviderProps) {
  const linguiLocale = normalizeLocale(locale)

  return (
    <LinguiProvider
      key={linguiLocale}
      locale={linguiLocale}
      loader={(l) => import(`../../locales/${l}.po`)}
      ssrLoader={ssrLoader}
    >
      {children}
    </LinguiProvider>
  )
}
