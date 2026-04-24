import { ButtonLinkList, ButtonLinkListItem } from '@graphcommerce/next-ui'
import { storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokRowButtonLinkList as RowButtonLinkListBlok } from '../types'

export function RowButtonLinkList({ blok }: { blok: RowButtonLinkListBlok }) {
  const links = blok.links ?? []
  const isBig = links.some((link) => (link.target?.story?.name?.length ?? 0) > 30)

  return (
    <ButtonLinkList
      title={blok.title ?? ''}
      containsBigLinks={isBig}
      component='h2'
      {...storyblokEditable(blok)}
    >
      {links.map((link) => (
        <ButtonLinkListItem
          {...storyblokEditable(link)}
          key={link._uid}
          url={`/${link.target?.cached_url ?? ''}`}
        >
          {link.target?.story?.name}
        </ButtonLinkListItem>
      ))}
    </ButtonLinkList>
  )
}
