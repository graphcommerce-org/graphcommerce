import { ProductNameFragment } from './ProductName.gql'

export type ProductNameProps = {
  product: ProductNameFragment
}

export const ProductName = (props: ProductNameProps) => {
  const { product } = props

  return <>{product.name}</>
}
