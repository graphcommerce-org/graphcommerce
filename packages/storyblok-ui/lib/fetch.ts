import type { ApolloClient } from '@graphcommerce/graphql'
import { publishRenewSignal, refreshRenewSignal } from '@graphcommerce/graphql'
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
 * Freshness is push-based: {@link requestStoryblokCacheVersionRefresh} publishes a renew signal
 * that every server picks up. This TTL is the failsafe for deployments where that signal cannot be
 * shared, so it is never disabled entirely — an undelivered signal has to degrade to stale content,
 * not to frozen content.
 *
 * Configurable via `storyblok.cacheVersionTtl` (seconds; 0 refreshes on every read). The schema
 * default is not reflected in the generated config values, hence the fallback below.
 */
const CV_REFRESH_TTL_MS = (storyblok?.cacheVersionTtl ?? 3600) * 1000
let cvRefreshedAt = 0
let forceRefreshRequested = false

/** Newest renew signal this process has already acted on. */
let appliedRenewSignal = 0

/**
 * Request an immediate cache-version refresh on the next published read, on every server.
 *
 * Safe to call from any context — including a cache-notify webhook handler that runs before
 * `storyblokInit` — because it never touches the Storyblok client (so it never logs the "apiPlugin
 * not loaded" warning). It flips a process-local flag for the server that handled the webhook and
 * publishes the shared renew signal for all the others, which pick it up on their next published
 * read.
 */
export function requestStoryblokCacheVersionRefresh(): void {
  forceRefreshRequested = true
  void publishRenewSignal()
}

/**
 * Advance the pinned cache-version when forced (see {@link requestStoryblokCacheVersionRefresh}),
 * when the shared renew signal has moved past what this process last applied, or once the TTL has
 * elapsed. Only called from the published-read fetch functions below, where `storyblokInit` has
 * always run, so `getStoryblokApi()` is safe here.
 *
 * The pin has to be applied by hand: `storyblok-js-client` only advances it from a response that
 * carries a top-level `cv`, and `cdn/spaces/me` answers with `{ space: { version } }` instead.
 * `space.version` is the same number a `cdn/stories` response returns as `cv`.
 *
 * When the version moved the client's response cache is flushed too, so a response cached under
 * `apiOptions.cache` cannot outlive the content it was cached for.
 */
async function refreshStoryblokCacheVersion(): Promise<void> {
  if (isDev) return
  const signal = (await refreshRenewSignal()) ?? 0
  const now = Date.now()
  if (
    !forceRefreshRequested &&
    signal <= appliedRenewSignal &&
    now - cvRefreshedAt < CV_REFRESH_TTL_MS
  )
    return
  // Optimistically mark refreshed so concurrent callers don't stampede cdn/spaces/me.
  forceRefreshRequested = false
  cvRefreshedAt = now
  appliedRenewSignal = Math.max(appliedRenewSignal, signal)
  try {
    const api = getStoryblokApi()
    const response = await api.get('cdn/spaces/me')
    const cv = (response?.data as { space?: { version?: number } } | undefined)?.space?.version
    if (typeof cv !== 'number') return
    if (api.cacheVersion() !== cv) await api.flushCache()
    api.setCacheVersion(cv)
  } catch {
    // A failed refresh keeps the previous cv; force a retry on the next read.
    cvRefreshedAt = 0
    forceRefreshRequested = true
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

const LINKS_PER_PAGE = 1000

/**
 * The set of published slugs for one cache-version, or `null` when the request failed.
 *
 * Memoized per cache-version rather than in the Storyblok client's response cache, because that
 * cache is opt-in (`apiOptions.cache`) and defaults to off — without a memo here an un-cached
 * project would fetch the index on every single `fetchStory`.
 */
let slugIndex: { cv: number; slugs: Promise<Set<string> | null> } | undefined

/** `foo/` and `/foo` both address the story that `cdn/links` reports under the slug `foo/`. */
function normalizeSlug(slug: string) {
  return slug.replace(/^\/+/, '').replace(/\/+$/, '')
}

type ISbLinkEntry = { slug?: string; is_folder?: boolean }

async function fetchSlugIndex(): Promise<Set<string> | null> {
  // Deliberately unscoped by language. `cdn/links?language=x` returns only the stories that have
  // content in that language, but `cdn/stories/<slug>?language=x` happily falls back to the default
  // language for the rest — so a language-scoped index would report existing pages as missing.
  // Story *existence* is language-independent; folder-level translations are separate stories and
  // appear in this list under their own slug.
  const params = { version: 'published' as const, per_page: LINKS_PER_PAGE }
  try {
    const first = await fetchWithRetry(() => getStoryblokApi().get('cdn/links', { ...params }))
    const total = first.total ?? 0
    const pages = [first]
    const totalPages = Math.ceil(total / LINKS_PER_PAGE)
    const remaining = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => i + 2)
    for (let i = 0; i < remaining.length; i += MAX_PAGE_CONCURRENCY) {
      const chunk = remaining.slice(i, i + MAX_PAGE_CONCURRENCY)
      pages.push(
        ...(await Promise.all(
          chunk.map((page) =>
            fetchWithRetry(() => getStoryblokApi().get('cdn/links', { ...params, page })),
          ),
        )),
      )
    }

    const slugs = new Set<string>()
    for (const page of pages) {
      for (const link of Object.values(page.data?.links ?? {}) as ISbLinkEntry[]) {
        // Folders are not stories. A folder with a start page contributes that start page as its
        // own non-folder entry (`clubkleding/`), so dropping folders here is what makes a folder
        // *without* one correctly report as missing.
        if (link.is_folder) continue
        if (typeof link.slug === 'string') slugs.add(normalizeSlug(link.slug))
      }
    }
    return slugs
  } catch (error) {
    logFetchError('fetchSlugIndex()', error)
    return null
  }
}

/**
 * Answers "can a published story exist at this slug?" without spending a request per slug.
 *
 * Crawlers and vulnerability scanners walk an unbounded number of made-up URLs, and a storefront's
 * catch-all route asks the CMS about every one of them before falling back. Remembering individual
 * 404s does not help there — every made-up URL is a fresh slug and therefore a fresh CDN request.
 * One `cdn/links` index per cache-version answers all of them for free instead: it lists every
 * published slug in the space in a single lightweight response (~300 bytes per story, one request
 * per 1000 stories) and is discarded as soon as the cache-version moves, i.e. as soon as anything
 * is published.
 *
 * Returns `undefined` when no index is available, meaning "don't know — go ask the CDN".
 */
async function isKnownSlug(slug: string): Promise<boolean | undefined> {
  const cv = getStoryblokApi().cacheVersion()
  // Before the first cache-version is pinned there is nothing to key the index on, and re-fetching
  // it per call would be worse than the problem it solves.
  if (!cv) return undefined

  if (slugIndex?.cv !== cv) slugIndex = { cv, slugs: fetchSlugIndex() }

  const slugs = await slugIndex.slugs
  return slugs ? slugs.has(normalizeSlug(slug)) : undefined
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

    // Draft reads skip the index: the Visual Editor must see an unpublished story the moment it is
    // created, and `cdn/links` only lists published ones. Development skips it too: `sbParams`
    // sends a fresh `cv` per request there, so an index would never be reused.
    if (!opts?.preview && !isDev && (await isKnownSlug(slug)) === false) return { data: null }

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
