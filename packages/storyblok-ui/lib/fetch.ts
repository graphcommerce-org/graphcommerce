import type { ApolloClient } from '@graphcommerce/graphql'
import {
  getStoryblokApi,
  type ISbStoriesParams,
  type ISbStoryData,
  type SbBlokData,
} from '@storyblok/react'
import { resolveStoryblokProducts } from './resolveProducts'

export type StoryblokStory = ISbStoryData<SbBlokData & { body?: SbBlokData[] }>

export type FetchStoryOpts = { preview?: boolean; locale?: string; defaultLocale?: string }
export type FetchStoriesParams = ISbStoriesParams & FetchStoryOpts

const isDev = process.env.NODE_ENV === 'development'
const STORIES_PER_PAGE = 100
const MAX_PAGE_CONCURRENCY = 3
const MAX_RETRIES = 3

/** Extracts the language prefix from a locale string (e.g. `en_US` → `en`). */
function langPrefix(locale?: string) {
  return locale?.split(/[-_]/)[0].toLowerCase()
}

/** Default params applied to every Storyblok CDN request. */
export const sbParams = (opts: FetchStoryOpts = {}) => {
  const lang = langPrefix(opts.locale)
  const defaultLang = langPrefix(opts.defaultLocale)
  const isDefault = !lang || lang === defaultLang

  return {
    version: (opts.preview || isDev ? 'draft' : 'published') as 'draft' | 'published',
    ...(isDev && { cv: Date.now() }),
    ...(!isDefault && { language: lang }),
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
