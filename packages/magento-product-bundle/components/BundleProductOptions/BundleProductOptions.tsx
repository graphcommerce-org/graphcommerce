import type { AddToCartItemSelector } from '@graphcommerce/magento-product'
import type { ActionCardListProps } from '@graphcommerce/next-ui'
import { nonNullable } from '@graphcommerce/next-ui'
import type { ProductPageItem_BundleFragment } from '../../graphql'
import { BundleOption } from './BundleOption'
import { BundleOptionValue } from './BundleOptionValue'
import type { BundleOptionValueProps } from './types'

export type BundelProductOptionsProps = Pick<
  ActionCardListProps,
  'size' | 'layout' | 'color' | 'variant'
> & {
  renderer?: React.FC<BundleOptionValueProps>
  product: ProductPageItem_BundleFragment
} & AddToCartItemSelector

export function BundleProductOptions(props: BundelProductOptionsProps) {
  const { product, index = 0, ...rest } = props

  return (
    <>
      {(product?.items ?? []).filter(nonNullable).map((item) => (
        <BundleOption
          index={index}
          key={item.uid}
          color='primary'
          item={item}
          product={product}
          {...rest}
          renderer={BundleOptionValue}
        />
      ))}
    </>
  )
}
