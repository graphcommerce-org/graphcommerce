import { ActionCardListProps, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { BundleOption } from './BundleOption'
import { BundleOptionValue } from './BundleOptionValue'
import { BundleProductOptionsFragment } from './BundleProductOptions.gql'
import { BundleOptionValueProps } from './types'

type BundelProductOptionsProps = Pick<
  ActionCardListProps,
  'size' | 'layout' | 'color' | 'variant'
> & {
  renderer?: React.FC<BundleOptionValueProps>
  product: BundleProductOptionsFragment
}

export function BundleProductOptions(props: BundelProductOptionsProps) {
  const { product } = props

  return (
    <>
      {filterNonNullableKeys(product?.items, ['uid', 'title', 'type']).map((item) => (
        <BundleOption
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
