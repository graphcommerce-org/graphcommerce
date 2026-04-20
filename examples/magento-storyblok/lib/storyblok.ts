import {
  fetchGlobalConfig as fetchGlobalConfigBase,
  useStoryblokState as useStoryblokStateBase,
} from '@graphcommerce/storyblok-ui'
import { apiPlugin, storyblokInit, type ISbStoryData } from '@storyblok/react'
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

export const fetchGlobalConfig = (
  opts?: Parameters<typeof fetchGlobalConfigBase>[0],
): Promise<GlobalConfigStory | null> => fetchGlobalConfigBase<StoryblokGlobalConfig>(opts)

export const useStoryblokState = (
  initialStory: ISbStoryData | null,
): ISbStoryData<StoryblokPage> | null => useStoryblokStateBase<StoryblokPage>(initialStory)

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
    row_pdp: RowPdp,
    row_product: RowProduct,
    row_quote: RowQuote,
    row_service_options: RowServiceOptions,
    row_special_banner: RowSpecialBanner,
  },
  enableFallbackComponent: true,
  customFallbackComponent: StoryblokFallback,
})
