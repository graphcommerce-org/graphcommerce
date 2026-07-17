import { UspList, UspListItem, type UspListProps } from '@graphcommerce/next-ui'
import { Asset, assetWithPoster, RichText, storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokPageLink } from '../Storyblok/types'

function UspIcon({ usp }: { usp: StoryblokPageLink }) {
  const { asset, poster } = assetWithPoster(usp.asset)
  if (!asset) return null
  return <Asset asset={asset} poster={poster} sizes='50px' unoptimized />
}

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
          icon={<UspIcon usp={usp} />}
          size={size}
        />
      ))}
    </UspList>
  )
}
