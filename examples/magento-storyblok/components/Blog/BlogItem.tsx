import { BlogListItem } from '@graphcommerce/next-ui'
import { Asset } from '@graphcommerce/storyblok-ui'
import { Trans } from '@lingui/react/macro'
import { Typography, useTheme } from '@mui/material'
import type { StoryblokStory } from '@graphcommerce/storyblok-ui'
import type { StoryblokPage } from '../Storyblok/types'

export type BlogItemProps = { story: StoryblokStory }

export function BlogItem({ story }: BlogItemProps) {
  const theme = useTheme()
  const content = story.content as StoryblokPage
  const asset = content?.asset

  return (
    <BlogListItem
      asset={
        asset?.filename ? (
          <Asset
            asset={asset}
            sizes={{
              0: '48vw',
              [theme.breakpoints.values.md]: '30vw',
              [theme.breakpoints.values.lg]: '25vw',
              [theme.breakpoints.values.xl]: '330px',
            }}
          />
        ) : (
          <Typography variant='body2'>
            <Trans>No Image</Trans>
          </Typography>
        )
      }
      title={story.name}
      date={content?.date}
      url={story.full_slug}
    />
  )
}
