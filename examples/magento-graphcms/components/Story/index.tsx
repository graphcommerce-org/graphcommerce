import { StoryList as NextStoryList } from '@graphcommerce/next-ui'
import { StoryItem } from './StoryItem'
import { StoryListQuery } from './StoryList.gql'

type StoryListProps = StoryListQuery & { current: string }

export function StoryList(props: StoryListProps) {
  const { storyList, current } = props

  return (
    <NextStoryList>
      <>
        {storyList.map((Story) => (
          <StoryItem key={Story.url} current={Story.url === current} {...Story} />
        ))}
      </>
    </NextStoryList>
  )
}
