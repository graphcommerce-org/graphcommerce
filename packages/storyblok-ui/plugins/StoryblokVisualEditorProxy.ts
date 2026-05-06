import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { storefront } from '@graphcommerce/next-config/config'
import type { proxy as proxyType } from '@graphcommerce/next-ui/proxy'
import { NextResponse } from 'next/server'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/next-ui/proxy',
  ifConfig: 'storyblok',
}

const LOCALES = storefront.map((s) => s.locale)
const DEFAULT_LOCALE = storefront.find((s) => s.defaultLocale)?.locale || LOCALES[0]

/**
 * The Storyblok Visual Editor opens preview URLs without a locale segment and signals the intended
 * locale via `_storyblok_lang`. Locale detection is disabled in next.config.ts (`localeDetection:
 * false`) so the editor isn't bounced away from the default locale, but that leaves the editor
 * stuck on whatever locale the URL happens to resolve to.
 *
 * This plugin watches for `_storyblok` requests and, when `_storyblok_lang` differs from the
 * current URL locale, redirects to the matching locale path so the editor renders the right
 * content.
 */
export const proxy: FunctionPlugin<typeof proxyType> = (prev, request) => {
  if (!request.nextUrl.searchParams.has('_storyblok')) return prev(request)

  const sbLang = request.nextUrl.searchParams.get('_storyblok_lang')
  const currentLocale = request.nextUrl.locale || DEFAULT_LOCALE
  const targetLocale = sbLang === 'default' || !sbLang ? DEFAULT_LOCALE : sbLang

  if (LOCALES.includes(targetLocale) && targetLocale !== currentLocale) {
    const url = request.nextUrl.clone()
    url.locale = targetLocale
    return NextResponse.redirect(url)
  }

  return prev(request)
}
