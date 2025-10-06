import type { ActionCardItemRenderProps } from '@graphcommerce/ecommerce-ui'
import type { ActionCardListProps } from '@graphcommerce/next-ui'
import type { ProductPageItem_BundleFragment } from '../../graphql'

export type BundleProductType = ProductPageItem_BundleFragment
export type BundleProductItemType = NonNullable<NonNullable<BundleProductType['items']>[number]>
export type BundleProductItemOptionType = NonNullable<
  NonNullable<BundleProductItemType['options']>[number]
>

export type BundleOptionProps = {
  renderer?: React.FC<ActionCardItemRenderProps<BundleOptionValueProps>>
  index: number
  product: BundleProductType
  item: BundleProductItemType
} & Pick<ActionCardListProps, 'size' | 'layout' | 'color' | 'variant'>

export type BundleOptionValueProps = {
  index: number
  product: BundleProductType
  item: BundleProductItemType
  option: BundleProductItemOptionType
}

const possibleTypes = ['radio', 'checkbox', 'multi', 'select'] as const
export type BundleOptionType = (typeof possibleTypes)[number]

export function toBundleOptionType(type: string | null | undefined): BundleOptionType {
  if (!type) return 'radio'
  if (possibleTypes.includes(type as BundleOptionType)) return type as BundleOptionType
  return 'radio'
}
