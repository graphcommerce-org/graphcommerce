import NextBlogHeader from '@reachdigital/next-ui/Blog/BlogHeader'
import Asset from '../Asset'

export default function BlogHeader(props) {
  const { asset } = props

  return <NextBlogHeader asset={asset.url ? <Asset asset={asset} width={328} /> : null} />
}
