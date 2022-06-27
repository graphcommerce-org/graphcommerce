import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { useNumberFormat } from '@graphcommerce/next-ui'
import { ProductWeightFragment } from './ProductWeight.gql'

export function ProductWeight(props: ProductWeightFragment) {
  const { weight } = props
  const { data: conf } = useQuery(StoreConfigDocument)
  const unit = conf?.storeConfig?.weight_unit ?? ''

  const numberFormatter = useNumberFormat()

  if (!numberFormatter || !weight) return null
  return (
    <>
      {numberFormatter.format(weight)} {unit}
    </>
  )
}
