import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { useMemo } from 'react'
import { ProductWeightFragment } from './ProductWeight.gql'

export default function ProductWeight(props: ProductWeightFragment) {
  const { weight } = props
  const { data: conf } = useQuery(StoreConfigDocument)
  const unit = conf?.storeConfig?.weight_unit ?? ''
  const locale = conf?.storeConfig?.locale

  const numberFormatter = useMemo(() => {
    if (!locale) return undefined
    /**
     * Todo: upgrade to browser native unit rendering when:
     *
     * - Node 14 is supported upstream
     * - Webkit/Safari supports the unit and unitDisplay option
     *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit
     */
    return new Intl.NumberFormat(locale.replace('_', '-'))
  }, [locale])

  if (!numberFormatter || !weight) return null
  return (
    <>
      {numberFormatter.format(weight)} {unit}
    </>
  )
}
