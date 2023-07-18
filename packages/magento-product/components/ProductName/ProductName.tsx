import { ProductPageMetaFragment } from '../ProductPageMeta/ProductPageMeta.gql'

export type ProductNameProps = {
  product: Pick<ProductPageMetaFragment, 'name' | 'url_key'>
}

export const ProductName = (props: ProductNameProps) => {
  const { product } = props

  return <>{product.name}</>
}
