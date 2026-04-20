import { Row } from '@graphcommerce/next-ui'
import { RichText, storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokRowBlogContent as RowBlogContentBlok } from '../types'

export function RowBlogContent({ blok }: { blok: RowBlogContentBlok }) {
  return (
    <Row maxWidth='md' {...storyblokEditable(blok)}>
      {blok.content && <RichText content={blok.content} />}
    </Row>
  )
}
