import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['en', 'nl']
const DEFAULT_LOCALE = 'en'

/**
 * Locale detection is disabled in next.config.ts (`localeDetection: false`) to prevent the Storyblok
 * Visual Editor from being redirected away from the default locale. This proxy re-implements the
 * same behaviour for regular visitors: on the root path, parse Accept-Language and redirect to the
 * preferred locale if it differs from the default.
 *
 * For the Storyblok Visual Editor, the `_storyblok_lang` param determines which locale to show.
 * When it differs from the current URL locale, the proxy redirects to the correct locale path.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.searchParams.has('_storyblok')) {
    const sbLang = request.nextUrl.searchParams.get('_storyblok_lang')
    const currentLocale = request.nextUrl.locale || DEFAULT_LOCALE
    const targetLocale = sbLang === 'default' || !sbLang ? DEFAULT_LOCALE : sbLang

    if (LOCALES.includes(targetLocale) && targetLocale !== currentLocale) {
      const url = request.nextUrl.clone()
      url.locale = targetLocale
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  if (request.nextUrl.pathname !== '/') return NextResponse.next()

  if (request.cookies.has('NEXT_LOCALE')) return NextResponse.next()

  const currentLocale = request.nextUrl.locale || DEFAULT_LOCALE
  const detected = parseAcceptLanguage(request.headers.get('accept-language'))

  if (detected && detected !== DEFAULT_LOCALE && detected !== currentLocale) {
    const url = request.nextUrl.clone()
    url.locale = detected
    const response = NextResponse.redirect(url)
    response.cookies.set('NEXT_LOCALE', detected)
    return response
  }

  return NextResponse.next()
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
