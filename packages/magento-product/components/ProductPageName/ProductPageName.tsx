import { ProductPageNameFragment } from './ProductPageName.gql'

export type ProductPageNameProps = {
  product: ProductPageNameFragment
}

export const ProductPageName = (props: ProductPageNameProps) => {
  const { product } = props
  return <>{product.name}</>
}
