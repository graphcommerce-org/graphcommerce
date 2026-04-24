import { ButtonLinkList, ButtonLinkListItem } from '@graphcommerce/next-ui'
import { multilinkHref, storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokRowButtonLinkList as RowButtonLinkListBlok } from '../types'

export function RowButtonLinkList({ blok }: { blok: RowButtonLinkListBlok }) {
  const links = blok.links ?? []
  const labelOf = (link: (typeof links)[number]) => link.title || link.target?.story?.name || ''
  const isBig = links.some((link) => labelOf(link).length > 30)

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
          url={multilinkHref(link.target)}
        >
          {labelOf(link)}
        </ButtonLinkListItem>
      ))}
    </ButtonLinkList>
  )
}
