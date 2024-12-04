import type { ActionCardItemRenderProps } from '@graphcommerce/ecommerce-ui'
import type { ActionCardListProps } from '@graphcommerce/next-ui'
import type { BundleProductOptionsFragment } from './BundleProductOptions.gql'

export type BundleOptionProps = {
  idx: number
  index: number
  renderer?: React.FC<ActionCardItemRenderProps<BundleOptionValueProps>>
} & NonNullable<NonNullable<BundleProductOptionsFragment['items']>[number]> &
  Pick<ActionCardListProps, 'size' | 'layout' | 'color' | 'variant'>

export type BundleOptionValueProps = NonNullable<
  NonNullable<BundleOptionProps['options']>[number]
> & {
  idx: number
  index: number
  required: boolean
}
