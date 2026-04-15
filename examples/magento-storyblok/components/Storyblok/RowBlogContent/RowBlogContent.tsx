import { Row } from '@graphcommerce/next-ui'
import { RichText } from '@graphcommerce/storyblok-ui'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import type { StoryblokRowBlogContent as RowBlogContentBlok } from '../types'

export function RowBlogContent({ blok }: { blok: RowBlogContentBlok }) {
  return (
    <Row maxWidth='md' {...storyblokEditable(blok as unknown as SbBlokData)}>
      {blok.content && <RichText content={blok.content} />}
    </Row>
  )
}
