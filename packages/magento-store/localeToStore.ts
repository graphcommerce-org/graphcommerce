if (!process.env.NEXT_PUBLIC_LOCALE_STORES) {
  throw Error('Please provide NEXT_PUBLIC_LOCALE_STORES in your .env')
}
const localeStores = JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES) as {
  [index: string]: string
}

export default function localeToStore(locale?: string) {
  if (!locale) return Object.values(localeStores)?.[0]
  return localeStores?.[locale]
}

export function defaultLocale() {
  return Object.keys(localeStores)?.[0] as string
}

export function storeToLocale(store?: string | null) {
  return Object.entries(localeStores).find(([, s]) => s === store)?.[0]
}
