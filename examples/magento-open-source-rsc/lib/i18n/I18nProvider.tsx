'use client'

import { normalizeLocale } from '@graphcommerce/next-ui'
import type { Messages } from '@lingui/core'
import { i18n } from '@lingui/core'
import { I18nProvider as LinguiI18nProvider } from '@lingui/react'
import { useEffect, useState } from 'react'

type I18nProviderProps = {
  locale: string
  children: React.ReactNode
}

type MessageLoader = (locale: string) => Promise<{ messages: Messages }>
type SyncMessageLoader = (locale: string) => { messages: Messages }

const ssrLoader: SyncMessageLoader = (l: string) =>
  // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
  typeof window === 'undefined' ? require(`../../locales/${l}.po`) : { messages: {} }

const loader: MessageLoader = (l: string) => import(`../../locales/${l}.po`)

/**
 * I18n Provider for the App Router This is a simplified version that doesn't use useLocale() or
 * useStorefrontConfig() which rely on next/router Instead, the locale is passed explicitly as a
 * prop from the server component
 */
export function I18nProvider({ locale, children }: I18nProviderProps) {
  const linguiLocale = normalizeLocale(locale)
  const [isActivated, setIsActivated] = useState(false)

  // Activate locale immediately on the server
  if (typeof window === 'undefined' && i18n.locale !== linguiLocale) {
    const { messages } = ssrLoader(linguiLocale)
    i18n.load(linguiLocale, messages)
    i18n.activate(linguiLocale)
  }

  useEffect(() => {
    const activateLocale = async () => {
      // Check if locale already activated from SSR
      if (i18n.locale === linguiLocale) {
        setIsActivated(true)
        return
      }

      // Try to load from DOM (hydration from SSR)
      const data = globalThis.document?.getElementById('lingui')
      if (data?.lang === linguiLocale && data?.textContent) {
        i18n.load(linguiLocale, JSON.parse(data.textContent) as Messages)
        i18n.activate(linguiLocale)
        setIsActivated(true)
        return
      }

      // Load dynamically
      try {
        const { messages } = await loader(linguiLocale)
        i18n.load(linguiLocale, messages)
        i18n.activate(linguiLocale)
        setIsActivated(true)
      } catch (e) {
        if (process.env.NODE_ENV !== 'production')
          throw new Error(
            `Could not load locale. Can't find the .po file for the locale '${linguiLocale}'.`,
          )
        if (process.env.NODE_ENV === 'production') console.error(e)
      }
    }

    activateLocale()
  }, [linguiLocale])

  // On server, always render children (SSR will have activated i18n)
  // On client, wait until activated
  if (typeof window !== 'undefined' && !isActivated && i18n.locale !== linguiLocale) {
    // Return children wrapped in provider with empty locale to avoid null render
    // This allows the page structure to exist while loading
    if (!i18n.locale) {
      i18n.load(linguiLocale, {})
      i18n.activate(linguiLocale)
    }
  }

  return <LinguiI18nProvider i18n={i18n}>{children}</LinguiI18nProvider>
}
