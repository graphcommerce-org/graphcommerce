import { ButtonLinkList, ButtonLinkListItem } from '@graphcommerce/next-ui'
import { storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokRowButtonLinkList as RowButtonLinkListBlok } from '../types'

export function RowButtonLinkList({ blok }: { blok: RowButtonLinkListBlok }) {
  const isBig = blok.links?.some((link) => (link.title?.length ?? 0) > 30) ?? false

  return (
    <ButtonLinkList
      title={blok.title ?? ''}
      containsBigLinks={isBig}
      component='h2'
      {...storyblokEditable(blok)}
    >
      {blok.links?.map((link) => (
        <ButtonLinkListItem {...storyblokEditable(link)} key={link._uid} url={`/${link.url ?? ''}`}>
          {link.title}
        </ButtonLinkListItem>
      ))}
    </ButtonLinkList>
  )
}
