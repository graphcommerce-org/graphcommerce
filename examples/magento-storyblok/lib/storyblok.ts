import { storyblok } from '@graphcommerce/next-config/config'
import {
  fetchStory,
  useStoryblokState as useStoryblokStateBase,
  type FetchStoryOpts,
} from '@graphcommerce/storyblok-ui'
import { apiPlugin, storyblokInit, type ISbStoryData } from '@storyblok/react'
import { useRouter } from 'next/router'
import { StoryblokFallback } from '../components/Storyblok/Fallback'
import { RowBlogContent } from '../components/Storyblok/RowBlogContent/RowBlogContent'
import { RowButtonLinkList } from '../components/Storyblok/RowButtonLinkList/RowButtonLinkList'
import { RowColumnOne } from '../components/Storyblok/RowColumnOne/RowColumnOne'
import { RowColumnThree } from '../components/Storyblok/RowColumnThree/RowColumnThree'
import { RowColumnTwo } from '../components/Storyblok/RowColumnTwo/RowColumnTwo'
import { RowHeroBanner } from '../components/Storyblok/RowHeroBanner/RowHeroBanner'
import { RowLinks } from '../components/Storyblok/RowLinks/RowLinks'
import { RowPdp } from '../components/Storyblok/RowPdp/RowPdp'
import { RowProduct } from '../components/Storyblok/RowProduct/RowProduct'
import { RowQuote } from '../components/Storyblok/RowQuote/RowQuote'
import { RowServiceOptions } from '../components/Storyblok/RowServiceOptions/RowServiceOptions'
import { RowSpecialBanner } from '../components/Storyblok/RowSpecialBanner/RowSpecialBanner'
import type { StoryblokGlobalConfig, StoryblokPage } from '../components/Storyblok/types'

export type GlobalConfigStory = ISbStoryData<StoryblokGlobalConfig>

export async function fetchGlobalConfig(opts?: FetchStoryOpts): Promise<GlobalConfigStory | null> {
  const result = await fetchStory('global/config', opts)
  const story = result.data?.story
  if (!story) return null
  if (story.content?.component === 'global_config') {
    return story as GlobalConfigStory
  }
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      `fetchGlobalConfig: expected story at 'global/config' to have content of type 'global_config' but got '${story.content?.component}'. Check the slug and the component assigned to it in Storyblok.`,
    )
  }
  return null
}

/**
 * Reads the Storyblok Visual Editor mode and language from the page's query string. Used by the
 * `useStoryblokState` wrappers below to decide whether to enable bridge subscription + product
 * resolution and to refetch in the editor-selected language. Outside the editor (regular
 * visitors and soft navs) `initialStory` is already fully resolved by `fetchStory` in
 * `getStaticProps` so the inner hook short-circuits via `skip: true`.
 */
export function useEditorState() {
  const query = useRouter().query
  const isEditor = Boolean(query._storyblok)
  // eslint-disable-next-line no-underscore-dangle
  const rawLang = typeof query._storyblok_lang === 'string' ? query._storyblok_lang : undefined
  const editorLanguage = isEditor && rawLang ? (rawLang === 'default' ? '' : rawLang) : undefined
  return { skip: !isEditor, editorLanguage }
}

export const useStoryblokState = (
  initialStory: ISbStoryData | null,
): ISbStoryData<StoryblokPage> | null =>
  useStoryblokStateBase<StoryblokPage>(initialStory, useEditorState())

export const useGlobalConfigState = (
  initialStory: ISbStoryData | null,
): ISbStoryData<StoryblokGlobalConfig> | null =>
  useStoryblokStateBase<StoryblokGlobalConfig>(initialStory, useEditorState())

export const getStoryblokApi = storyblokInit({
  accessToken: storyblok.accessToken,
  use: [apiPlugin],
  components: {
    row_blog_content: RowBlogContent,
    row_button_link_list: RowButtonLinkList,
    row_column_one: RowColumnOne,
    row_column_two: RowColumnTwo,
    row_column_three: RowColumnThree,
    row_hero_banner: RowHeroBanner,
    row_links: RowLinks,
    row_pdp: RowPdp,
    row_product: RowProduct,
    row_quote: RowQuote,
    row_service_options: RowServiceOptions,
    row_special_banner: RowSpecialBanner,
  },
  enableFallbackComponent: true,
  customFallbackComponent: StoryblokFallback,
})
