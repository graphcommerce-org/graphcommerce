import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import { ProductImageFragment } from './ProductImage.gql'

export default function ProductImage(props: ProductImageFragment) {
  const { url } = props

  if (!url) return null

  // eslint-disable-next-line jsx-a11y/alt-text

  return <PictureResponsiveNext src={url} type='image/jpeg' width={500} height={500} alt='hoi' />
}
