/**
 * To support using multiple storefronts using the same language locale (which
 * next.js does not support), we use an additional 'tag' in the locale code in
 * which we specify a unique string (i.e. a Magento store code).
 *
 * This makes next.js happy, as it still follows the BCP47 spec. However, the
 * Intl API and other places may not accept this as a valid locale.
 *
 * Use this method to get a 'normalized' locale that can safely be used in such
 * places.
 */
export function normalizeLocale(locale: string | undefined) {
  if (!locale) return locale

  // Specifically match the xx-yy-storecode format, so we don't accidently 'fix'
  // valid locales such as he-Hebr-IL or zh-Hans-CN. This this isn't perfect and
  // we should consider a more formalized way to use such pseudo-locales, which
  // can be matched more precisely.
  const matches = locale?.match(/([a-z]{2})-([a-z]{2})-([a-z]+)/i)
  if (matches) {
    return `${matches[1]}-${matches[2]}`
  }
  return locale
}
