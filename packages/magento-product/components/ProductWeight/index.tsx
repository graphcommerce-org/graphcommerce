import { MagentoEnv } from '@graphcommerce/magento-store'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { ProductWeightFragment } from './ProductWeight.gql'

export default function ProductWeight(props: ProductWeightFragment) {
  const { weight } = props
  const { locale } = useRouter()
  const unit = (process.env as MagentoEnv).NEXT_PUBLIC_WEIGHT_UNIT

  const numberFormatter = useMemo(
    () =>
      /**
       * Todo: upgrade to browser native unit rendering when:
       *
       * - Webkit/Safari supports the unit and unitDisplay option
       *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit
       */
      new Intl.NumberFormat(locale?.replace('_', '-')),
    [locale],
  )

  if (!numberFormatter || !weight) return null
  return (
    <>
      {numberFormatter.format(weight)} {unit}
    </>
  )
}
