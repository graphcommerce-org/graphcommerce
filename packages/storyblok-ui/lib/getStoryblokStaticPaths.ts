import type { GetStaticPathsResult } from 'next'
import { fetchAllStories } from './fetch'

type FilterQuery = Record<string, Record<string, string>>

export type GetStoryblokStaticPathsOptions = {
  /**
   * Storyblok component name to filter by. Defaults to `'page'` so the result
   * mirrors how the storefront routes content stories.
   */
  contentType?: string
  /** Storyblok filter_query — see https://www.storyblok.com/docs/api/content-delivery/v2#filter-queries */
  filterQuery?: FilterQuery
  /** Override the page size of the underlying CDN request. */
  pageSize?: number
}

/**
 * Fetch all Storyblok stories matching the given filters and return them as
 * Next.js static paths. Used by sitemap and `getStaticPaths` for content
 * routes.
 */
export async function getStoryblokStaticPaths(
  locale: string,
  options: GetStoryblokStaticPathsOptions = {},
): Promise<GetStaticPathsResult<{ url: string[] }>['paths']> {
  const { contentType = 'page', filterQuery, pageSize = 100 } = options

  const stories = await fetchAllStories({
    per_page: pageSize,
    content_type: contentType,
    ...(filterQuery && { filter_query: filterQuery }),
    locale,
  })

  return stories
    .filter((story) => Boolean(story.full_slug))
    .map((story) => ({ params: { url: story.full_slug.split('/') }, locale }))
}
