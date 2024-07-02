import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { UnitFormat, UnitFormatProps } from '@graphcommerce/next-ui'
import { ProductWeightFragment } from './ProductWeight.gql'

export type ProductWeightProps = Omit<UnitFormatProps, 'unit'> & { product: ProductWeightFragment }

export function ProductWeight(props: ProductWeightProps) {
  const { product, ...rest } = props

  const { data: conf } = useQuery(StoreConfigDocument)

  if (!product.weight) return null

  const unit = conf?.storeConfig?.weight_unit === 'lbs' ? 'pound' : 'kilogram'

  return (
    <UnitFormat unit={unit} {...rest}>
      {product.weight}
    </UnitFormat>
  )
}
