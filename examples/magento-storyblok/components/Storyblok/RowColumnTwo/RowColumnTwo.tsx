import { ColumnTwo } from '@graphcommerce/next-ui'
import { RichText, storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokRowColumnTwo as RowColumnTwoBlok } from '../types'

export function RowColumnTwo({ blok }: { blok: RowColumnTwoBlok }) {
  return (
    <ColumnTwo
      {...storyblokEditable(blok)}
      colOneContent={blok.col_one ? <RichText content={blok.col_one} /> : undefined}
      colTwoContent={blok.col_two ? <RichText content={blok.col_two} /> : undefined}
    />
  )
}
