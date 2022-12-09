import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { PluginProps } from '@graphcommerce/next-config'
import { gtagSelectItem } from '../events/gtagSelectItem/gtagSelectItem'
import { useGtagViewItemList } from '../events/useGtagViewItemList/useGtagViewItemList'

export const component = 'ProductListItemsBase'
export const exported = '@graphcommerce/magento-product'

export function GaProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, onClick, ...rest } = props

  useGtagViewItemList(props)

  return (
    <Prev
      {...rest}
      onClick={(e, item) => {
        gtagSelectItem({ item })
        return onClick?.(e, item)
      }}
    />
  )
}

export const Plugin = GaProductListItemsBase
