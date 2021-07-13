import { NextBlogHeader } from '@reachdigital/next-ui'
import Asset from '../Asset'

export default function BlogHeader(props) {
  const { asset } = props

  return (
    <NextBlogHeader
      asset={asset.url ? <Asset asset={asset} sizes={{ 0: '100vw', 800: '800px' }} /> : null}
    />
  )
}
