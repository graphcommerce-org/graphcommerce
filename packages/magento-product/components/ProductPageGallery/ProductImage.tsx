import { Image } from '@graphcommerce/image'
import type { ProductImageFragment } from './ProductImage.gql'

export function ProductImage(props: ProductImageFragment) {
  const { url, label } = props

  if (!url) return null

  return <Image src={url} width={328} height={328} alt={label ?? ''} dontReportWronglySizedImages />
}
