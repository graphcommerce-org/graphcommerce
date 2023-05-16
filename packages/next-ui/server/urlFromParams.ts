import { ParsedUrlQuery } from 'querystring'

/** Create a URL from the params provided. */
export function urlFromParams(params?: ParsedUrlQuery | string) {
  if (!params) return ''
  if (typeof params === 'string') return params

  return Object.entries(params)
    .filter(([k]) => k !== 'storefront')
    .map(([k, v]) =>
      Array.isArray(v) ? v.map(decodeURIComponent).join('/') : decodeURIComponent(v),
    )
    .join('/')
}
