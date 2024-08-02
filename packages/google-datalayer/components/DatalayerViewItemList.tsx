import { ProductItemsGridProps } from '@graphcommerce/magento-product'
import { useMemoObject } from '@graphcommerce/next-ui'
import { useEventCallback } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useSendEvent } from '../api/sendEvent'
import {
  productItemsToViewItemList,
  viewItemListToSelectItem,
} from '../mapping/productItemsToViewItemList/productItemsToViewItemList'

const DatalayerSelectItemContext = React.createContext<((itemId: string) => void) | undefined>(
  undefined,
)

export function useViewItemList() {
  const context = useContext(DatalayerSelectItemContext)
  if (!context) {
    return (itemId: string) => {
      console.log(`No DatalayerSelectItemContext provider found, trying to select item ${itemId}`)
    }
  }
  return context
}

export function DatalayerViewItemList(
  props: ProductItemsGridProps & { children: React.ReactNode },
) {
  const { title: item_list_name, items, children } = props
  const item_list_id = item_list_name.toLowerCase().replace(/\s/g, '_')

  const sendEvent = useSendEvent()
  const viewItemList = useMemoObject(
    productItemsToViewItemList(item_list_id, item_list_name, items),
  )
  useEffect(() => sendEvent('view_item_list', viewItemList), [viewItemList])

  const selectItem = useEventCallback((itemId: string) => {
    sendEvent('select_item', viewItemListToSelectItem(viewItemList, itemId))
  })

  return (
    <DatalayerSelectItemContext.Provider value={selectItem}>
      {children}
    </DatalayerSelectItemContext.Provider>
  )
}
