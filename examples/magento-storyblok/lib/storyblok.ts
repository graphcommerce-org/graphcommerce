import type { ApolloClient } from '@graphcommerce/graphql'
import { apiPlugin, storyblokInit, type ISbStoryData, type SbBlokData } from '@storyblok/react'
import { resolveStoryblokProducts } from './resolveStoryblokProducts'
import type { StoryblokGlobalConfig } from '../components/Storyblok/types'
import { StoryblokFallback } from '../components/Storyblok/Fallback'
import { RowBlogContent } from '../components/Storyblok/RowBlogContent/RowBlogContent'
import { RowButtonLinkList } from '../components/Storyblok/RowButtonLinkList/RowButtonLinkList'
import { RowColumnOne } from '../components/Storyblok/RowColumnOne/RowColumnOne'
import { RowColumnThree } from '../components/Storyblok/RowColumnThree/RowColumnThree'
import { RowColumnTwo } from '../components/Storyblok/RowColumnTwo/RowColumnTwo'
import { RowHeroBanner } from '../components/Storyblok/RowHeroBanner/RowHeroBanner'
import { RowLinks } from '../components/Storyblok/RowLinks/RowLinks'
import { RowProduct } from '../components/Storyblok/RowProduct/RowProduct'
import { RowQuote } from '../components/Storyblok/RowQuote/RowQuote'
import { RowServiceOptions } from '../components/Storyblok/RowServiceOptions/RowServiceOptions'
import { RowSpecialBanner } from '../components/Storyblok/RowSpecialBanner/RowSpecialBanner'

export type StoryblokStory = ISbStoryData<SbBlokData & { body?: SbBlokData[] }>

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

/** Fetch multiple stories matching a slug prefix (e.g. `service`). */
export async function fetchStories(
  startsWith: string,
  opts?: FetchStoryOpts,
): Promise<StoryblokStory[]> {
  try {
    const response = await getStoryblokApi().get('cdn/stories', {
      ...sbParams(opts),
      starts_with: startsWith,
      per_page: 100,
    })
    return response.data?.stories ?? []
  } catch {
    return []
  }
}

/** Fetch a single story by slug. When `apolloClient` is provided, resolves product data for row_product bloks. */
export async function fetchStory(
  slug: string,
  opts?: FetchStoryOpts,
  apolloClient?: ApolloClient,
): Promise<{ data: { story: StoryblokStory } | null }> {
  try {
    const result = await getStoryblokApi().get(`cdn/stories/${slug}`, sbParams(opts))
    if (apolloClient && result.data?.story?.content?.body) {
      // Mutates story body in-place, attaching product data to row_product bloks.
      await resolveStoryblokProducts(result.data.story.content.body, apolloClient)
    }
    return result
  } catch {
    return { data: null }
  }
}

export type GlobalConfigStory = ISbStoryData<StoryblokGlobalConfig>

/** Fetch the global config story used for header/footer content. */
export async function fetchGlobalConfig(
  opts?: FetchStoryOpts,
): Promise<GlobalConfigStory | null> {
  const result = await fetchStory('config', opts)
  return (result.data?.story as unknown as GlobalConfigStory) ?? null
}

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    row_blog_content: RowBlogContent,
    row_button_link_list: RowButtonLinkList,
    row_column_one: RowColumnOne,
    row_column_two: RowColumnTwo,
    row_column_three: RowColumnThree,
    row_hero_banner: RowHeroBanner,
    row_links: RowLinks,
    row_product: RowProduct,
    row_quote: RowQuote,
    row_service_options: RowServiceOptions,
    row_special_banner: RowSpecialBanner,
  },
  enableFallbackComponent: true,
  customFallbackComponent: StoryblokFallback,
})
