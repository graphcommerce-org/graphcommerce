import { i18n, Messages } from '@lingui/core'
import { I18nProvider, I18nProviderProps } from '@lingui/react'
import { nl, en, fr } from 'make-plural/plurals'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { MessageLoader } from '../types'

type LinguiProviderProps = Omit<I18nProviderProps, 'i18n'> & {
  children: React.ReactNode
  loader: MessageLoader
  locale?: string
}

i18n.loadLocaleData({
  nl: { plurals: nl },
  fr: { plurals: fr },
  en: { plurals: en },
})

export default function LinguiProvider(props: LinguiProviderProps) {
  const { loader, locale = 'en', ...i18nProviderPRops } = props

  useMemo(() => {
    const localeOnly = locale?.split('-')?.[0]

    if (!localeOnly) return
    const data = globalThis.document?.getElementById('lingui')

    if (data?.lang === localeOnly && data.textContent) {
      // @todo: We're not loading the plurals dynamically, but we can't because it will load the complete module.
      i18n.load(localeOnly, JSON.parse(data.textContent) as Messages)
      i18n.activate(localeOnly)
    } else if (i18n.locale !== locale) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      ;(async () => {
        try {
          const { messages } = await loader(localeOnly)
          i18n.load(localeOnly, messages)
          i18n.activate(localeOnly)
        } catch (e) {
          if (process.env.NODE_ENV !== 'production')
            throw new Error(
              `Can not find the .po file for the locale '${localeOnly}'. Possible reasons:
- If you've added a new locale, please run 'yarn lingui:extact' to generate the .po file.
- Make sure the passed load function is correct.`,
            )
          if (process.env.NODE_ENV === 'production') console.error(e)
        }
      })()
    }
  }, [locale, loader])

  return <I18nProvider i18n={i18n} {...i18nProviderPRops} />
}
