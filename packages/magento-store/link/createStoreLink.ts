import { setContext } from '@graphcommerce/graphql'
import { localeToStore } from '../localeToStore'

/** Apollo link to set the store header in the context */
export const createStoreLink = (locale?: string) =>
  setContext((_, context) => {
    if (!context.headers) context.headers = {}
    context.headers.store = localeToStore(locale)
    return context
  })
