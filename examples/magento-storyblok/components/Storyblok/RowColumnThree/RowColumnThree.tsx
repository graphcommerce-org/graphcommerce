import { ColumnThree } from '@graphcommerce/next-ui'
import { RichText } from '@graphcommerce/storyblok-ui'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import type { StoryblokRowColumnThree as RowColumnThreeBlok } from '../types'

export function RowColumnThree({ blok }: { blok: RowColumnThreeBlok }) {
  return (
    <ColumnThree
      {...storyblokEditable(blok as unknown as SbBlokData)}
      colOneContent={blok.col_one ? <RichText content={blok.col_one} /> : undefined}
      colTwoContent={blok.col_two ? <RichText content={blok.col_two} /> : undefined}
      colThreeContent={blok.col_three ? <RichText content={blok.col_three} /> : undefined}
    />
  )
}
