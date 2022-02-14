if (!process.env.NEXT_PUBLIC_LOCALE_STORES) {
  throw Error('Please provide NEXT_PUBLIC_LOCALE_STORES in your .env')
}

const localeStores = JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES) as {
  [index: string]: string
}

export function localeToStore(locale?: string | null | undefined) {
  if (!locale) return Object.values(localeStores)?.[0]
  return localeStores?.[locale]
}

export function defaultLocale(): string {
  return Object.keys(localeStores)?.[0]
}

export function storeToLocale(store?: string | null | undefined) {
  return Object.entries(localeStores).find(([, s]) => s === store)?.[0]
}
