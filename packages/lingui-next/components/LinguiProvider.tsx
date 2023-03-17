import { storefrontConfig, storefrontConfigDefault } from '@graphcommerce/next-ui'
import { i18n, Messages } from '@lingui/core'
import { I18nProvider, I18nProviderProps } from '@lingui/react'
import { nl, en, fr } from 'make-plural/plurals'
import React, { useMemo } from 'react'
import { MessageLoader, SyncMessageLoader } from '../types'

export type LinguiProviderProps = Omit<I18nProviderProps, 'i18n'> & {
  children: React.ReactNode
  loader: MessageLoader
  ssrLoader: SyncMessageLoader
  locale: string
}

// todo: Load these plurals with a loader, however dynamic imports doesn't support tree shaking so loading them dynamically will load all locales.
i18n.loadLocaleData({
  nl: { plurals: nl },
  fr: { plurals: fr },
  en: { plurals: en },
})

export const localeConfig = (locale: string = storefrontConfigDefault().locale) =>
  storefrontConfig(locale)?.linguiLocale ?? locale?.split('-')[0]

export function LinguiProvider(props: LinguiProviderProps) {
  const { loader, ssrLoader, locale, ...i18nProviderProps } = props

  const localeOnly = localeConfig(locale)

  useMemo(() => {
    const data = globalThis.document?.getElementById('lingui')

    if (data?.lang === localeOnly && data.textContent) {
      // @todo: We're not loading the plurals dynamically, but we can't because it will load the complete module.
      i18n.load(localeOnly, JSON.parse(data.textContent) as Messages)
      i18n.activate(localeOnly)
    } else if (i18n.locale !== localeOnly) {
      if (typeof window === 'undefined') {
        const { messages } = ssrLoader(localeOnly)
        i18n.load(localeOnly, messages)
        i18n.activate(localeOnly)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        ;(async () => {
          try {
            const { messages } = await loader(localeOnly)
            i18n.load(localeOnly, messages)
            i18n.activate(localeOnly)
          } catch (e) {
            if (process.env.NODE_ENV !== 'production')
              throw new Error(
                `Could not load locale. Can't find the .po file for the locale '${localeOnly}'. Possible reasons:
- You have configured a new locale in the .env and there is no .po file for it. Please run 'yarn lingui:extact' to generate the .po file or duplicate an existing one.
- The load function you passed to is incorrect.`,
              )
            if (process.env.NODE_ENV === 'production') console.error(e)
          }
        })()
      }
    }
    // We dont want to call this when the loader/ssrLoader changes, because it will cause a re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localeOnly])

  return <I18nProvider i18n={i18n} {...i18nProviderProps} />
}
