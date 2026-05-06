import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { storefront } from '@graphcommerce/next-config/config'
import type { proxy as proxyType } from '@graphcommerce/next-ui/proxy'
import { NextResponse } from 'next/server'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/next-ui/proxy',
}

const LOCALES = storefront.map((s) => s.locale)
const DEFAULT_LOCALE = storefront.find((s) => s.defaultLocale)?.locale || LOCALES[0]

/**
 * Locale detection is disabled in next.config.ts (`localeDetection: false`) to prevent the
 * Storyblok Visual Editor from being redirected away from the default locale. This plugin
 * re-implements the same behaviour for regular visitors: on the root path, parse Accept-Language
 * and redirect to the preferred locale if it differs from the default.
 *
 * Storyblok-specific Visual-Editor locale routing lives in
 * `@graphcommerce/storyblok-ui/plugins/StoryblokVisualEditorProxy.ts`.
 */
export const proxy: FunctionPlugin<typeof proxyType> = (prev, request) => {
  if (request.nextUrl.searchParams.has('_storyblok')) return prev(request)
  if (request.nextUrl.pathname !== '/') return prev(request)
  if (request.cookies.has('NEXT_LOCALE')) return prev(request)

  const currentLocale = request.nextUrl.locale || DEFAULT_LOCALE
  const detected = parseAcceptLanguage(request.headers.get('accept-language'))

  if (detected && detected !== DEFAULT_LOCALE && detected !== currentLocale) {
    const url = request.nextUrl.clone()
    url.locale = detected
    const response = NextResponse.redirect(url)
    response.cookies.set('NEXT_LOCALE', detected)
    return response
  }

  return prev(request)
}

function parseAcceptLanguage(header: string | null): string | undefined {
  if (!header) return undefined

  return header
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=')
      return { lang: lang.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
    .find(({ lang }) => LOCALES.includes(lang))?.lang
}
