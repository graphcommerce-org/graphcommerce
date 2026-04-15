import { ButtonLinkList, ButtonLinkListItem } from '@graphcommerce/next-ui'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import type { StoryblokRowButtonLinkList as RowButtonLinkListBlok } from '../types'

export function RowButtonLinkList({ blok }: { blok: RowButtonLinkListBlok }) {
  const isBig = blok.links?.some((link) => (link.title?.length ?? 0) > 30) ?? false

  return (
    <ButtonLinkList
      title={blok.title ?? ''}
      containsBigLinks={isBig}
      component='h2'
      {...storyblokEditable(blok as unknown as SbBlokData)}
    >
      {blok.links?.map((link) => (
        <ButtonLinkListItem
          {...storyblokEditable(link as unknown as SbBlokData)}
          key={link._uid}
          url={`/${link.url ?? ''}`}
        >
          {link.title}
        </ButtonLinkListItem>
      ))}
    </ButtonLinkList>
  )
}
