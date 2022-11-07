import { ClientContext, setContext } from '@graphcommerce/graphql'
import { defaultLocale } from '@graphcommerce/magento-store'

/**
 * Add a gcms-locales header to make sure queries return in a certain language with a fallback to
 * defaultLocale().
 *
 * This will create a fallback list like: `nl_nl,nl,en_us,en`
 */
export const createHygraphLink = (locale?: string) =>
  setContext((_, context: ClientContext) => {
    if (!context.headers) context.headers = {}

    const gcmsLocales = [
      locale?.replace('-', '_'),
      locale?.split('-')[0],
      defaultLocale().replace('-', '_'),
      defaultLocale().split('-')[0],
    ]
    context.headers['gcms-locales'] = gcmsLocales.filter(Boolean).join(',')
    return context
  })
