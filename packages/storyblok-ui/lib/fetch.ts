import type { ApolloClient } from '@graphcommerce/graphql'
import { storyblok } from '@graphcommerce/next-config/config'
import { storefrontConfig } from '@graphcommerce/next-ui'
import {
  getStoryblokApi,
  type ISbStoriesParams,
  type ISbStoryData,
  type SbBlokData,
} from '@storyblok/react'
import { resolveStoryblokProducts } from './resolveProducts'

export type StoryblokStory = ISbStoryData<SbBlokData & { body?: SbBlokData[] }>

export type FetchStoryOpts = {
  preview?: boolean
  locale?: string
  defaultLocale?: string
  /**
   * Storyblok component-field paths whose UUID references should be hydrated
   * into full story objects in the response (e.g. `row_button_link_list.links`).
   */
  resolveRelations?: string | string[]
  /**
   * Direct Storyblok language override. When set, takes precedence over the
   * storefront-config based `storyblokLocale` and the locale-prefix fallback.
   * Empty string means "no `language` param" — Storyblok serves its space
   * default. Used by `useStoryblokState` to refetch in the editor's selected
   * language.
   */
  language?: string
}
export type FetchStoriesParams = ISbStoriesParams & FetchStoryOpts

const isDev = process.env.NODE_ENV === 'development'
const STORIES_PER_PAGE = 100
const MAX_PAGE_CONCURRENCY = 3
const MAX_RETRIES = 3

/**
 * `storyblok-js-client` pins the space cache-version (`cv`) per process on the first published
 * request and—because `cache.clear` defaults to `'manual'`—never refreshes it. Published content
 * therefore stays frozen at the process-start `cv` until the process restarts. On long-lived
 * servers (e.g. multi-pod Kubernetes) this means published edits never become visible.
 *
 * We bound the staleness by periodically re-fetching `cdn/spaces/me`, which returns the current
 * `cv` and updates the client's pinned value, so subsequent reads hit the fresh (CDN-cached)
 * version. Skipped in dev, where `sbParams` already sends a fresh `cv` on every request.
 *
 * The interval is configurable via `storyblok.cacheVersionTtl` (seconds, default 60; 0 refreshes
 * on every read).
 */
const CV_REFRESH_TTL_MS = (storyblok?.cacheVersionTtl ?? 60) * 1000
let cvRefreshedAt = 0

export async function refreshStoryblokCacheVersion(force = false): Promise<void> {
  if (isDev) return
  const now = Date.now()
  if (!force && now - cvRefreshedAt < CV_REFRESH_TTL_MS) return
  // Optimistically mark refreshed so concurrent callers don't stampede cdn/spaces/me.
  cvRefreshedAt = now
  try {
    await getStoryblokApi().get('cdn/spaces/me')
  } catch {
    // A failed refresh keeps the previous cv; reset so the next call retries.
    cvRefreshedAt = 0
  }
}

/** Extracts the language prefix from a locale string (e.g. `en_US` → `en`). */
function langPrefix(locale?: string) {
  return locale?.split(/[-_]/)[0].toLowerCase()
}

/** Default params applied to every Storyblok CDN request. */
export const sbParams = (opts: FetchStoryOpts = {}) => {
  const lang = langPrefix(opts.locale)
  const defaultLang = langPrefix(opts.defaultLocale)
  const isDefault = !lang || lang === defaultLang
  // Per-storefront override — lets projects map a GraphCommerce locale to a
  // Storyblok language explicitly. Needed when the GC default locale differs
  // from the Storyblok space's default language (e.g. GC default `nl_NL` while
  // Storyblok stays English-default). When unset, fall back to the legacy
  // locale-prefix heuristic.
  const explicitLanguage = storefrontConfig(opts.locale)?.storyblokLocale
  // Direct override has highest priority. Empty string = no `language` param
  // (Storyblok serves its default language).
  const language =
    opts.language !== undefined
      ? opts.language || undefined
      : (explicitLanguage ?? (!isDefault ? lang : undefined))

  const resolveRelations = Array.isArray(opts.resolveRelations)
    ? opts.resolveRelations.join(',')
    : opts.resolveRelations

  return {
    version: (opts.preview || isDev ? 'draft' : 'published') as 'draft' | 'published',
    // Hydrate `multilink` fields with the linked story's basic info (name,
    // slug, full_slug). Lighter than `resolve_relations` because it never
    // includes the linked story's `content.body`.
    resolve_links: 'story' as const,
    ...(resolveRelations && { resolve_relations: resolveRelations }),
    ...(isDev && { cv: Date.now() }),
    ...(language && { language }),
  }
}

/**
 * 404s are an expected outcome of "does this slug exist?" lookups, so they're swallowed silently.
 * Anything else (network failure, auth, malformed response) gets logged in dev so it doesn't look
 * indistinguishable from a missing story.
 */
function logFetchError(label: string, error: unknown) {
  if (!isDev) return
  const err = error as { status?: number; message?: string; response?: unknown }
  if (err?.status === 404) return
  console.error(`${label} failed [status=${err?.status}]:`, err?.message ?? error)
  if (err?.response) console.error(`${label} response:`, err.response)
  if (err?.status === 401) {
    const api = getStoryblokApi()
    const client = (api as unknown as { client?: { accessToken?: string; baseURL?: string } })
      .client
    console.error(`${label} 401 debug:`, {
      tokenSet: Boolean(client?.accessToken),
      tokenPrefix: client?.accessToken?.slice(0, 6),
      tokenLength: client?.accessToken?.length,
      baseURL: client?.baseURL,
    })
  }
}

/**
 * Wraps a Storyblok request and retries on 429, honoring the Retry-After header. Other errors
 * propagate so the caller's try/catch can decide what to do.
 */
async function fetchWithRetry<T>(request: () => Promise<T>, attempt = 0): Promise<T> {
  try {
    return await request()
  } catch (error) {
    const status = (error as { status?: number })?.status
    if (status !== 429 || attempt >= MAX_RETRIES) throw error
    const headers = (error as { headers?: Record<string, string | undefined> })?.headers
    const retryAfter = Number(headers?.['retry-after']) || 1
    await new Promise((resolve) => {
      setTimeout(resolve, retryAfter * 1000)
    })
    return fetchWithRetry(request, attempt + 1)
  }
}

function storiesRequest(params: FetchStoriesParams, page: number, perPage: number) {
  const { preview, locale, defaultLocale, ...storyblokParams } = params
  return fetchWithRetry(() =>
    getStoryblokApi().get('cdn/stories', {
      ...sbParams({ preview, locale, defaultLocale }),
      ...storyblokParams,
      per_page: perPage,
      page,
    }),
  )
}

/**
 * Fetch a single page of stories from the Storyblok CDN and expose the response meta so callers can
 * render pagination controls. Use this for listing screens.
 */
export async function fetchStories(
  params: FetchStoriesParams,
): Promise<{ stories: StoryblokStory[]; total: number; perPage: number }> {
  const perPage = params.per_page ?? STORIES_PER_PAGE
  const page = params.page ?? 1
  try {
    if (!params.preview) await refreshStoryblokCacheVersion()
    const response = await storiesRequest(params, page, perPage)
    return {
      stories: response.data?.stories ?? [],
      total: response.total ?? 0,
      perPage,
    }
  } catch (error) {
    logFetchError(`fetchStories(${JSON.stringify(params)})`, error)
    return { stories: [], total: 0, perPage }
  }
}

/**
 * Fetch every story matching the given params by auto-paginating through all pages with bounded
 * concurrency. Use this for getStaticPaths-style "give me every slug" queries where pagination
 * controls aren't needed.
 */
export async function fetchAllStories(params: FetchStoriesParams): Promise<StoryblokStory[]> {
  const perPage = params.per_page ?? STORIES_PER_PAGE
  try {
    if (!params.preview) await refreshStoryblokCacheVersion()
    const first = await storiesRequest(params, 1, perPage)
    const stories: StoryblokStory[] = first.data?.stories ?? []
    const totalPages = Math.ceil((first.total ?? stories.length) / perPage)
    if (totalPages <= 1) return stories

    const remaining = Array.from({ length: totalPages - 1 }, (_, i) => i + 2)
    for (let i = 0; i < remaining.length; i += MAX_PAGE_CONCURRENCY) {
      const chunk = remaining.slice(i, i + MAX_PAGE_CONCURRENCY)
      const results = await Promise.all(chunk.map((p) => storiesRequest(params, p, perPage)))
      for (const r of results) stories.push(...(r.data?.stories ?? []))
    }
    return stories
  } catch (error) {
    logFetchError(`fetchAllStories(${JSON.stringify(params)})`, error)
    return []
  }
}

/**
 * Fetch a single story by slug. When `apolloClient` is provided, resolves product data for
 * row_product bloks.
 */
export async function fetchStory(
  slug: string,
  opts?: FetchStoryOpts,
  apolloClient?: ApolloClient,
): Promise<{ data: { story: StoryblokStory } | null }> {
  try {
    if (!opts?.preview) await refreshStoryblokCacheVersion()
    const result = await fetchWithRetry(() =>
      getStoryblokApi().get(`cdn/stories/${slug}`, sbParams(opts)),
    )
    if (apolloClient && result.data?.story?.content?.body) {
      await resolveStoryblokProducts(result.data.story.content.body, apolloClient)
    }
    return result
  } catch (error) {
    logFetchError(`fetchStory('${slug}')`, error)
    return { data: null }
  }
}
