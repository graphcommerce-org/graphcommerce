import { ColumnOne, VariantMessage } from '@graphcommerce/next-ui'
import { RichText, storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokRowColumnOne as RowColumnOneBlok } from '../types'

export function RowColumnOne({ blok }: { blok: RowColumnOneBlok }) {
  const variant = (blok.variant as unknown as string) || 'Default'

  if (variant === 'Message') {
    return (
      <VariantMessage id={blok._uid} {...storyblokEditable(blok)}>
        {blok.col_one && <RichText content={blok.col_one} />}
      </VariantMessage>
    )
  }

  return (
    <ColumnOne {...storyblokEditable(blok)}>
      {blok.col_one && <RichText content={blok.col_one} />}
    </ColumnOne>
  )
}
