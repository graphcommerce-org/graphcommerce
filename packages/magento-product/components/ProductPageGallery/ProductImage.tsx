import { Image } from '@reachdigital/image'
import { ProductImageFragment } from './ProductImage.gql'

export default function ProductImage(props: ProductImageFragment) {
  const { url, label } = props

  if (!url) return null

  return <Image src={url} width={328} height={328} alt={label ?? ''} dontReportWronglySizedImages />
}
