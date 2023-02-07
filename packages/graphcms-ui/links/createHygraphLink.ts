import { setContext } from '@graphcommerce/graphql'
import { i18nConfigDefault, i18nConfig } from '@graphcommerce/next-ui'

/**
 * Add a gcms-locales header to make sure queries return in a certain language with a fallback to
 * defaultLocale().
 *
 * This will create a fallback list like: `nl_nl,nl,en_us,en`
 */
export const createHygraphLink = (locale?: string) =>
  setContext((_, context) => {
    if (!context.headers) context.headers = {}

    const gcmsLocales = i18nConfig(locale)?.hygraphLocales ?? [
      locale?.replace('-', '_'),
      locale?.split('-')[0],
      i18nConfigDefault().locale.replace('-', '_'),
      i18nConfigDefault().locale.split('-')[0],
    ]
    context.headers['gcms-locales'] = gcmsLocales.filter(Boolean).join(',')
    return context
  })
