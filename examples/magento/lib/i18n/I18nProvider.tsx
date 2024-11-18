import { LinguiProvider, LinguiProviderProps, SyncMessageLoader } from '@graphcommerce/lingui-next'
import { normalizeLocale } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'

type I18nProviderProps = Pick<LinguiProviderProps, 'locale' | 'children'>

const ssrLoader: SyncMessageLoader = (l: string) =>
  // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
  typeof window === 'undefined' ? require(`../../locales/${l}.po`) : { messages: [] }

export function i18nSsrLoader(locale?: string) {
  const linguiLocale = normalizeLocale(locale)
  i18n.load(linguiLocale, ssrLoader(linguiLocale).messages)
  i18n.activate(linguiLocale)
}

/**
 * Reason for it to exist: We're loading the translations from a relative path, this a good thing.
 * This allows for easy overwriting of translations.
 *
 * We provide the loader and ssrLoader because we need to:
 *
 * - Be able to load different translations based on the locale in the browser.
 * - Be able to load the translations while rendering server side. We need this to be synchronous.
 *
 * See `examples/magento/pages/_app.tsx` for usage.
 *
 * Todo: When React Server Components is released, move this to a server component.
 */
export function I18nProvider({ locale, children }: I18nProviderProps) {
  return (
    <LinguiProvider
      key={locale}
      locale={locale}
      loader={(l) => import(`../../locales/${l}.po`)}
      ssrLoader={ssrLoader}
    >
      {children}
    </LinguiProvider>
  )
}
