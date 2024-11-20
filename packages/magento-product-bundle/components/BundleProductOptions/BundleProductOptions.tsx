import type { AddToCartItemSelector } from '@graphcommerce/magento-product'
import type { ActionCardListProps } from '@graphcommerce/next-ui'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { BundleOption } from './BundleOption'
import { BundleOptionValue } from './BundleOptionValue'
import type { BundleProductOptionsFragment } from './BundleProductOptions.gql'
import type { BundleOptionValueProps } from './types'

type BundelProductOptionsProps = Pick<
  ActionCardListProps,
  'size' | 'layout' | 'color' | 'variant'
> & {
  renderer?: React.FC<BundleOptionValueProps>
  product: BundleProductOptionsFragment
} & AddToCartItemSelector

export function BundleProductOptions(props: BundelProductOptionsProps) {
  const { product, index = 0 } = props

  return (
    <>
      {filterNonNullableKeys(product?.items, ['uid', 'title', 'type']).map((item) => (
        <BundleOption
          index={index}
          key={item.uid}
          color='primary'
          {...props}
          {...item}
          idx={item.position ?? 0 + 1000}
          renderer={BundleOptionValue}
        />
      ))}
    </>
  )
}
