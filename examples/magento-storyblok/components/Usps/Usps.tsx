import { UspList, UspListItem, type UspListProps } from '@graphcommerce/next-ui'
import { Asset, RichText, storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokPageLink } from '../Storyblok/types'

export type UspsProps = {
  usps?: StoryblokPageLink[] | null
} & Pick<UspListProps, 'size'>

export function Usps(props: UspsProps) {
  const { usps, size } = props

  if (!usps?.length) return null

  return (
    <UspList size={size}>
      {usps.map((usp) => (
        <UspListItem
          {...storyblokEditable(usp)}
          key={usp._uid}
          text={usp.description ? <RichText content={usp.description} /> : (usp.title ?? '')}
          icon={usp.asset?.filename ? <Asset asset={usp.asset} sizes='50px' unoptimized /> : null}
          size={size}
        />
      ))}
    </UspList>
  )
}
