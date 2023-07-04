import { ProductNameFragment } from './ProductName.gql'

export const ProductName = (props: ProductNameFragment) => {
  const { name } = props

  return <>{name}</>
}
