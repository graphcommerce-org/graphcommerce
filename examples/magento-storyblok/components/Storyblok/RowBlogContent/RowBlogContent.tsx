import { BlogContent, Row } from '@graphcommerce/next-ui'
import { RichText, storyblokEditable } from '@graphcommerce/storyblok-ui'
import { Box } from '@mui/material'
import type { StoryblokRowBlogContent as RowBlogContentBlok } from '../types'

export function RowBlogContent({ blok }: { blok: RowBlogContentBlok }) {
  return (
    <Box {...storyblokEditable(blok)}>
      <BlogContent>{blok.content && <RichText content={blok.content} />}</BlogContent>
    </Box>
  )
}
