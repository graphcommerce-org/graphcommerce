import type { SimplifyDeep, SetRequired } from 'type-fest'
import type { GcPageQuery } from '../queries/GcPage.gql'
import { Redirect } from 'next'

type FoundPage = NonNullable<GcPageQuery['page']>

export type GcPage = {
  page: Omit<FoundPage, 'redirect'>
}

export type GcPageRedirect = {
  page: { redirect: NonNullable<FoundPage['redirect']> }
}

export type GcPageNotFound = { page?: null | undefined }

export function isGcPageNotFound(
  query: GcPage | GcPageRedirect | GcPageNotFound | null | undefined,
): query is GcPageNotFound {
  return !query?.page
}

export function isGcPageRedirect(
  query: GcPage | GcPageRedirect | GcPageNotFound | null | undefined,
): query is GcPageRedirect {
  return Boolean(query?.page && 'redirect' in query.page && query.page.redirect)
}

export function isGcPageFound(
  query: GcPage | GcPageRedirect | GcPageNotFound | null | undefined,
): query is GcPage {
  return !isGcPageNotFound(query) && !isGcPageRedirect(query)
}

export function gcPageRedirectOrNotFound(
  query: GcPageQuery | null | undefined,
): { redirect: Redirect; revalidate?: number | boolean } | { notFound: true } {
  if (isGcPageRedirect(query)) return { redirect: query.page.redirect }
  if (isGcPageNotFound(query)) return { notFound: true }

  throw Error(
    'gcPageRedirectOrNotFound should only be called when it isGcPageFound(query) returns false',
  )
}
