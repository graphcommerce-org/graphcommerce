import { Asset, AssetFragment } from '@graphcommerce/hygraph-ui'
import { BlogHeader as NextBlogHeader } from '@graphcommerce/next-ui'

export function BlogHeader(props: { asset?: AssetFragment }) {
  const { asset } = props
  return (
    <NextBlogHeader
      asset={asset ? <Asset asset={asset} sizes={{ 0: '100vw', 800: '800px' }} /> : null}
    />
  )
}
