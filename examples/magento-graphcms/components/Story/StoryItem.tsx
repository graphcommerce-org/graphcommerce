import { StoryItem as NextStoryItem } from '@graphcommerce/next-ui'
import { Typography } from '@material-ui/core'
import Asset from '../Asset'
import { StoryItemFragment } from './StoryItem.gql'

type StoryItemProps = StoryItemFragment & { current: boolean }

export default function StoryItem(props: StoryItemProps) {
  const { title, url, asset, current } = props

  return (
    <NextStoryItem
      asset={
        asset ? (
          <Asset asset={asset} sizes={{ 0: '60px', 711: '100px', 1350: '100px' }} />
        ) : (
          <div>
            <Typography variant='body2'>No Image</Typography>
          </div>
        )
      }
      title={title ?? ''}
      url={url}
      current={current && current}
    />
  )
}
