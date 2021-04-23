import RichText from '@reachdigital/graphcms-ui/RichText'
import SpecialBanner from '@reachdigital/next-ui/Row/SpecialBanner'
import SpecialBannerAnchorLink from '@reachdigital/next-ui/Row/SpecialBannerAnchorLink'
import PageLink from 'next/link'
import Asset from '../Asset'
import { RowSpecialBannerFragment } from './RowSpecialBanner.gql'

type RowSpecialBannerProps = RowSpecialBannerFragment

export default function RowSpecialBanner(props: RowSpecialBannerProps) {
  const { copy, asset, topic, pageLinks } = props

  return (
    <SpecialBanner
      topic={topic}
      asset={<Asset asset={asset} width={328} />}
      pageLinks={pageLinks.map((pageLink) => (
        <PageLink href={pageLink.url} key={pageLink.url}>
          <SpecialBannerAnchorLink href={pageLink.url} title={pageLink.title} />
        </PageLink>
      ))}
      RichContent={(richTextOneClasses) => <RichText {...richTextOneClasses} {...copy} />}
    />
  )
}
