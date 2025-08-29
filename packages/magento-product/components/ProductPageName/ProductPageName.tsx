import type { ProductPageNameFragment } from './ProductPageName.gql'

export type ProductPageNameProps = {
  product: ProductPageNameFragment
}

export function ProductPageName(props: ProductPageNameProps) {
  const { product } = props
  return <>{product.name}</>
}
