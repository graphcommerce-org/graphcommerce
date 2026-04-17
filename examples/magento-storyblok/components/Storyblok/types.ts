export type * from '../../.storyblok/types/components'
export type * from '../../.storyblok/types/storyblok'

import type { StoryblokPage } from '../../.storyblok/types/components'

type StoryblokBlok = NonNullable<StoryblokPage['body']>[number]

export type StoryblokBlokMap = {
  [B in StoryblokBlok as B['component']]: B
}
