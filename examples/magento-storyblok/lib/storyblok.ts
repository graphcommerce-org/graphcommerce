import { apiPlugin, storyblokInit, type ISbStoryData, type SbBlokData } from '@storyblok/react'
import { StoryblokFallback } from '../components/Storyblok/Fallback'
import { StoryblokPage } from '../components/Storyblok/Page'
import { RowHeroBanner } from '../components/Storyblok/RowHeroBanner'
import { RowLinks } from '../components/Storyblok/RowLinks/RowLinks'

/**
 * After running `yarn storyblok:types`, replace the `SbBlokData` default with your generated
 * `ContentType` union for typed `story.content`:
 *
 * Import type { ContentType } from '../.storyblok/types/<space>/storyblok-components' export type
 * StoryblokStory = ISbStoryData<ContentType>
 */
export type StoryblokStory = ISbStoryData<SbBlokData>

const isDev = process.env.NODE_ENV === 'development'

type FetchStoryOpts = { preview?: boolean; locale?: string; defaultLocale?: string }

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

/** Fetch a single story by slug. Returns `{ data: null }` if not found. */
export async function fetchStory(
  slug: string,
  opts?: FetchStoryOpts,
): Promise<{ data: { story: StoryblokStory } | null }> {
  try {
    return await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams(opts))
  } catch {
    return { data: null }
  }
}

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page: StoryblokPage,
    row_hero_banner: RowHeroBanner,
    row_links: RowLinks,
  },
  enableFallbackComponent: true,
  customFallbackComponent: StoryblokFallback,
})
