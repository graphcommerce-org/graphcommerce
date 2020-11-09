if (!process.env.NEXT_PUBLIC_LOCALE_STORES) {
  throw Error('Please provide NEXT_PUBLIC_LOCALE_STORES in your .env')
}
const localeStores = JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES)

export default function localeToStore(locale?: string) {
  if (!locale) return Object.values(localeStores)?.[0]
  return localeStores?.[locale]
}
