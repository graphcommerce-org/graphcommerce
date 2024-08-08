import type { SimplifyDeep, SetRequired } from 'type-fest'
import type { PageQuery } from '../components/Page/Page.gql'
import { Redirect } from 'next'

type FoundPage = NonNullable<PageQuery['page']>

export type Page = {
  page: Omit<FoundPage, 'redirect'>
}

export type PageRedirect = {
  page: { redirect: NonNullable<FoundPage['redirect']> }
}

export type PageNotFound = { page?: null | undefined }

export function isPageNotFound(
  query: Page | PageRedirect | PageNotFound | null | undefined,
): query is PageNotFound {
  return !query?.page
}

export function isPageRedirect(
  query: Page | PageRedirect | PageNotFound | null | undefined,
): query is PageRedirect {
  return Boolean(query?.page && 'redirect' in query.page && query.page.redirect)
}

export function isPageFound(
  query: Page | PageRedirect | PageNotFound | null | undefined,
): query is Page {
  return !isPageNotFound(query) && !isPageRedirect(query)
}

export function pageRedirectOrNotFound(
  query: PageQuery | null | undefined,
): { redirect: Redirect; revalidate?: number | boolean } | { notFound: true } {
  if (isPageRedirect(query)) return { redirect: query.page.redirect }
  if (isPageNotFound(query)) return { notFound: true }

  throw Error(
    'pageRedirectOrNotFound should only be called when it isPageFound(query) returns false',
  )
}
