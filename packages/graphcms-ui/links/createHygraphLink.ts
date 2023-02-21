import { setContext } from '@graphcommerce/graphql'
import { i18nConfig } from '@graphcommerce/next-ui'

/** Add a gcms-locales header to make sure queries return in a certain language. */
export const createHygraphLink = (locale?: string) =>
  setContext((_, context) => {
    if (!context.headers) context.headers = {}

    const locales = i18nConfig(locale)?.hygraphLocales
    if (locales) context.headers['gcms-locales'] = locales.join(',')

    return context
  })
