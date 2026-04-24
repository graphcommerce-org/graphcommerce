import { BlogItemGrid } from '@graphcommerce/next-ui'
import type { StoryblokStory } from '@graphcommerce/storyblok-ui'
import { BlogItem } from './BlogItem'

export type BlogListProps = { stories: StoryblokStory[] }

export function BlogList({ stories }: BlogListProps) {
  return (
    <BlogItemGrid>
      {stories.map((story) => (
        <BlogItem key={story.uuid} story={story} />
      ))}
    </BlogItemGrid>
  )
}
