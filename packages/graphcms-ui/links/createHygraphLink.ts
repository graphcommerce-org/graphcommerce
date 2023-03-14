import { setContext } from '@graphcommerce/graphql'
import { storefrontConfig } from '@graphcommerce/next-ui'

/** Add a gcms-locales header to make sure queries return in a certain language. */
export const createHygraphLink = (locale?: string) =>
  setContext((_, context) => {
    if (!context.headers) context.headers = {}

    const locales = storefrontConfig(locale)?.hygraphLocales
    if (locales) context.headers['gcms-locales'] = locales.join(',')

    return context
  })
