import PictureResponsiveSharp from '@reachdigital/next-ui/PictureResponsiveSharp'
import { ProductImageFragment } from './ProductImage.graphql'

export default function ProductImage(props: ProductImageFragment & { layoutId?: string }) {
  const { url, layoutId } = props

  if (!url) return null

  // eslint-disable-next-line jsx-a11y/alt-text

  return <PictureResponsiveSharp src={url} type='image/jpeg' width={500} height={500} alt='hoi' />
}
