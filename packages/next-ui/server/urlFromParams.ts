import { ParsedUrlQuery } from 'querystring'

/** Create a URL from the params provided. */
export function urlFromParams(params: ParsedUrlQuery = {}) {
  return Object.values(params)
    .map((v) => (Array.isArray(v) ? v.join('/') : v))
    .join('/')
}
